'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { COURSES } from '@/lib/data';
import { 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  Download, 
  FileText, 
  MessageSquare, 
  Check, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function LessonClassroomPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const resolvedParams = use(params);
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({ l1: true, l2: true });
  const [activeTab, setActiveTab] = useState<'notes' | 'resources'>('notes');
  const [noteContent, setNoteContent] = useState('Ghi chú bài học: Cần áp dụng kỹ thuật Few-shot Prompting vào việc phân tích báo cáo doanh thu tuần tới.');

  const course = COURSES.find((c) => c.slug === resolvedParams.slug) || COURSES[0];
  const lessons = course.lessons || [];
  const currentLesson = lessons.find((l) => l.id === resolvedParams.id) || lessons[0] || {
    id: 'l1',
    chapter: 'Chương 1',
    title: 'Bài giảng AI Thực Chiến',
    duration: '20:00'
  };

  const toggleComplete = (id: string) => {
    setCompletedLessons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-950 flex flex-col">
      {/* Top Learning Navigation Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/hoc-vien"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-cyan-400 truncate">{currentLesson.title}</p>
          </div>
        </div>

        <button
          onClick={() => toggleComplete(currentLesson.id)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            completedLessons[currentLesson.id]
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{completedLessons[currentLesson.id] ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
        </button>
      </div>

      {/* Main Classroom Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left: Video Player and Tab Content */}
        <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col space-y-6 overflow-y-auto">
          {/* Video Player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Lesson Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase">{currentLesson.chapter}</span>
              <h2 className="text-xl font-bold text-white mt-1">{currentLesson.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bài trước</span>
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1">
                <span>Bài tiếp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tabs for Notes and Downloads */}
          <div className="space-y-4">
            <div className="flex gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'notes' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Ghi chú học viên
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'resources' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tài liệu & File đính kèm
              </button>
            </div>

            {activeTab === 'notes' ? (
              <div className="space-y-2">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Ghi lại các ý tưởng quan trọng trong bài học này..."
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => alert('Đã lưu ghi chú thành công!')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  Lưu ghi chú
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Tong-hop-Prompt-Bai-Hoc-2.1.pdf</p>
                      <p className="text-[10px] text-slate-400">1.8 MB · Tài liệu chính thức</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Đang tải file đính kèm...')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Course Syllabus Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/60 border-l border-white/10 p-4 sm:p-6 overflow-y-auto">
          <h3 className="text-sm font-bold text-white mb-4">Mục lục khóa học</h3>
          <div className="space-y-2">
            {lessons.map((l) => {
              const isCurrent = l.id === currentLesson.id;
              const isDone = completedLessons[l.id];

              return (
                <Link
                  key={l.id}
                  href={`/hoc-vien/khoa-hoc/${course.slug}/bai/${l.id}`}
                  className={`p-3 rounded-2xl flex items-start gap-3 transition-colors ${
                    isCurrent
                      ? 'bg-purple-600/20 border border-purple-500/40 text-white'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleComplete(l.id);
                    }}
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-white/20'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>

                  <div className="min-w-0">
                    <p className={`text-xs font-semibold line-clamp-2 ${isCurrent ? 'text-cyan-300 font-bold' : ''}`}>
                      {l.title}
                    </p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{l.duration}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
