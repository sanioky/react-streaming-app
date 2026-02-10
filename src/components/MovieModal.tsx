"use client";

import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X, Star, Play, Plus } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { Movie } from "@/types/api";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { ProgressBar } from "./ProgressBar";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  const { history, saveProgress } = useWatchHistory();

  if (!movie) return null;

  const progress = history[movie.id]?.progress ?? 0;

  const handleWatchNow = () => {
    const nextProgress = Math.min(progress + 5, 100);
    saveProgress(movie.id, nextProgress);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 text-left shadow-2xl transition-all">
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute right-4 top-4 z-20 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-[40%] aspect-2/3">
                    <Image
                      src={movie.thumbnail}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent md:hidden" />
                  </div>

                  <div className="p-8 md:p-10 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">
                        Year:
                      </span>
                      <span className="text-zinc-200 text-sm font-medium">
                        {movie.year}
                      </span>
                    </div>

                    <DialogTitle
                      as="h2"
                      className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                      {movie.title}
                    </DialogTitle>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={18} fill="currentColor" />
                        <span className="text-white font-bold">
                          {movie.rating}
                        </span>
                      </div>
                      <span className="text-zinc-500">|</span>
                      <span className="text-zinc-300 text-sm italic">
                        {movie.genre.join(", ")}
                      </span>
                    </div>

                    {movie.description && (
                      <p className="text-zinc-400 leading-relaxed mb-8 text-sm md:text-base">
                        {movie.description}
                      </p>
                    )}

                    <ProgressBar
                      progress={progress}
                      label="Watching Progress"
                      className="mb-10"
                    />

                    <div className="flex flex-wrap gap-4 mt-auto">
                      <button className="btn-primary" onClick={handleWatchNow}>
                        <Play size={20} fill="black" />
                        {history[movie.id]?.progress
                          ? `Continue (${history[movie.id].progress}%)`
                          : "Watch Now"}
                      </button>
                      <button className="btn-secondary">
                        <Plus size={20} /> My List
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
