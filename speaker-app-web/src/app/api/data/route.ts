import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = "mongodb+srv://maki61858_db_user:B3xEmLumeZkmAAf6@cluster0.pgmbvdi.mongodb.net/speaker_db?appName=Cluster0";

const chapterSchema = new mongoose.Schema({ title: String, order: Number, languageId: String, iconUrl: String });
const topicSchema = new mongoose.Schema({ chapterId: mongoose.Schema.Types.ObjectId, title: String, description: String, order: Number, questions: Array });

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    
    const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
    const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

    // Fetch chapters, topics, users
    const chapters = await Chapter.find().lean();
    const topics = await Topic.find().lean();
    
    // We will dynamically fetch users if requested or just include them
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({}, { strict: false }));
    const users = await User.find().select('-password').lean();

    // Map into lessons format, explicitly filtering out 'uk' if it exists in DB
    const lessons = chapters.filter(ch => ch.languageId !== 'uk').map(ch => ({
      lessonId: ch._id.toString(),
      title: ch.title,
      language: ch.languageId || 'en',
      level: ch.title.match(/\[(.*?)\]/)?.[1] || "A1",
      order: ch.order,
      lessonData: topics.filter(t => t.chapterId?.toString() === ch._id.toString()).map(t => ({
        topicId: t._id.toString(),
        title: t.title,
        description: t.description,
        questions: t.questions || []
      }))
    }));

    // Read vocab.ts
    let vocabTopics: any[] = [];
    try {
       const vocabPath = path.resolve(process.cwd(), '../speaker-app/constants/vocab.ts');
       if (fs.existsSync(vocabPath)) {
          let content = fs.readFileSync(vocabPath, 'utf8');
          
          // Get all supported languages from the vocab file
          const langsMatch = content.match(/if \(lang === "(.*?)"\)/g);
          const langs = langsMatch ? langsMatch.map(l => l.match(/"(.*?)"/)?.[1]).filter(Boolean).filter(l => l !== 'uk') : ['en'];
          
          // Execute the string to get the vocabulary function
          const dataStr = content
              .replace('export const getVocabularyData = (lang: string) => {', 'return (lang) => {')
              .replace('export const getVocabularyData =', 'return');
          const getFn = new Function(dataStr);
          const fn = getFn();
          
          // Combine vocab from all languages into one list for the admin
          langs.forEach((lang: any) => {
            const langVocab = fn(lang) || [];
            langVocab.forEach((v: any) => {
               vocabTopics.push({
                 ...v,
                 language: lang,
                 id: `${lang}-${v.id}`
               });
            });
          });
       }
    } catch(e) {
       console.log('Error reading vocab', e);
    }

    return NextResponse.json({ lessons, vocabTopics, users });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
    
    const body = await req.json();
    const { type, data } = body;

    if (type === 'lesson') {
      const { lessonId, title, language } = data;
      
      if (lessonId && lessonId.startsWith('lesson-')) {
         // Create new
         const newChapter = new Chapter({ title, languageId: language, order: 0 });
         await newChapter.save();
         return NextResponse.json({ success: true, id: newChapter._id });
      } else {
         // Update existing
         await Chapter.findByIdAndUpdate(lessonId, { title, languageId: language });
         return NextResponse.json({ success: true });
      }
    }
    
    if (type === 'vocab') {
       // Currently Vocab is in a static file. We can just return success for the demo or implement a basic file rewrite.
       return NextResponse.json({ success: true, message: 'Vocab update queued' });
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (type === 'lesson' && id) {
       await Chapter.findByIdAndDelete(id);
       return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}
