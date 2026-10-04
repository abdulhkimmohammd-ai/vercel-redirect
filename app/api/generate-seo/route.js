import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { pageTitle, pageContent } = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'أنت خبير SEO محترف متخصص في تحسين محركات البحث لمواقع الديكور والدهانات في الرياض، السعودية. مهمتك توليد Meta Title جذاب (أقل من 60 حرفاً) و Meta Description احترافي (أقل من 155 حرفاً) يركز على الكلمات الدلالية المحلية.',
        },
        {
          role: 'user',
          content: `قم بتحسين الـ SEO للصفحة التالية:\nالعنوان الحالي: ${pageTitle}\nالمحتوى: ${pageContent}`,
        },
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
