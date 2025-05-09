import React, { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import AppLayout from "../components/AppLayout";

interface Reply {
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean;
  replies: Reply[];
}

interface CommentType extends Reply {}

const stories = [
  { name: "Your Story", img: "https://randomuser.me/api/portraits/women/44.jpg", active: true },
  { name: "Ben", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Lucie", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Marry", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Tony", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Anna", img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Mike", img: "https://randomuser.me/api/portraits/men/23.jpg" },
];

const featuredCards = [
  {
    name: "Noemi Slater",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    comments: [
      {
        user: "Ben",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Beautiful view!",
        time: "2m ago",
        likes: 2,
        liked: false,
        replies: [
          {
            user: "Noemi",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "Thanks Ben!",
            time: "1m ago",
            likes: 1,
            liked: false,
            replies: [],
          },
        ],
      },
      {
        user: "Lucie",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "Wish I was there!",
        time: "5m ago",
        likes: 0,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    name: "Ben Harper",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    comments: [
      {
        user: "Noemi",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "Amazing sky!",
        time: "1m ago",
        likes: 0,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    name: "Lucie Green",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    comments: [],
  },
  {
    name: "Marry Gold",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    comments: [],
  },
];

const navButtons = [
  {
    label: "Home",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
    ),
    active: true,
  },
  {
    label: "Explore",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    ),
    active: false,
  },
  {
    label: "Add",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
    ),
    center: true,
  },
  {
    label: "Chat",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    active: false,
  },
  {
    label: "Profile",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
    ),
    active: false,
  },
];

// Recursive comment component for threaded replies
function Comment({ comment, onLike, onReply, replyInput, setReplyInput, onSendReply, depth = 0, replyIdx }: {
  comment: CommentType;
  onLike: (replyIdx?: number, isReply?: boolean) => void;
  onReply: () => void;
  replyInput: string;
  setReplyInput: (val: string) => void;
  onSendReply: (replyIdx?: number, isReply?: boolean) => void;
  depth?: number;
  replyIdx?: number;
}) {
  const [showReply, setShowReply] = useState(false);
  return (
    <div className={`flex flex-col gap-1 ${depth > 0 ? 'ml-8' : ''}`}>
      <div className="flex items-start gap-2 group">
        <img src={comment.avatar} alt={comment.user} className="w-7 h-7 rounded-full object-cover border border-gray-200" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-gray-800 dark:text-gray-100 cursor-pointer hover:underline">{comment.user}</span>
            <span className="text-[10px] text-gray-400">{comment.time}</span>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-200">{comment.text}</div>
          <div className="flex items-center gap-3 mt-1">
            <button onClick={() => onLike()} className={`text-xs flex items-center gap-1 hover:underline ${comment.liked ? 'text-fuchsia-500 font-bold' : 'text-gray-500'}`}>Like{comment.likes > 0 && <span>{comment.likes}</span>}</button>
            <button onClick={() => setShowReply(v => !v)} className="text-xs text-gray-500 hover:underline">Reply</button>
          </div>
          {showReply && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={replyInput}
                onChange={e => setReplyInput(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-sm"
              />
              <button
                onClick={() => onSendReply(replyIdx, true)}
                className="px-3 py-2 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold text-xs shadow-md hover:scale-105 transition-transform"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Render replies recursively */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {comment.replies.map((reply: Reply, ridx: number) => (
            <Comment
              key={ridx}
              comment={reply}
              onLike={() => onLike(ridx, true)}
              onReply={() => {}}
              replyInput={replyInput}
              setReplyInput={setReplyInput}
              onSendReply={() => onSendReply(ridx, true)}
              depth={depth + 1}
              replyIdx={ridx}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // State for comment input per card
  const [commentInputs, setCommentInputs] = useState(Array(featuredCards.length).fill(""));
  const [comments, setComments] = useState(featuredCards.map(card => card.comments));
  // State for reply input per card and comment index
  const [replyInputs, setReplyInputs] = useState<string[][]>(featuredCards.map(card => card.comments.map(() => "")));
  const [openCommentBox, setOpenCommentBox] = useState<number | null>(null);
  const commentBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close comment box on outside click
  useEffect(() => {
    if (openCommentBox === null) return;
    function handleClick(event: MouseEvent) {
      if (typeof openCommentBox === 'number') {
        const ref = commentBoxRefs.current[openCommentBox];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenCommentBox(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openCommentBox]);

  // Like handler for top-level comments
  const handleLike = (cardIdx: number, commentIdx: number, replyIdx: number | null = null, isReply: boolean = false) => {
    setComments(prev =>
      prev.map((cardComments, i) => {
        if (i !== cardIdx) return cardComments;
        return cardComments.map((c, j) => {
          if (j !== commentIdx) return c;
          if (isReply && replyIdx !== null) {
            return {
              ...c,
              replies: c.replies.map((r, k) =>
                k === replyIdx ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
              ),
            };
          }
          return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
        });
      })
    );
  };

  // Reply input handler
  const handleReplyInput = (cardIdx: number, commentIdx: number, value: string) => {
    setReplyInputs(inputs =>
      inputs.map((arr, i) =>
        i === cardIdx
          ? arr.map((v, j) => (j === commentIdx ? value : v))
          : arr
      )
    );
  };

  // Send reply handler
  const handleSendReply = (cardIdx: number, commentIdx: number) => {
    const value = replyInputs[cardIdx]?.[commentIdx] || "";
    if (!value.trim()) return;
    setComments(prev =>
      prev.map((cardComments, i) => {
        if (i !== cardIdx) return cardComments;
        return cardComments.map((c, j) =>
          j === commentIdx
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    user: "You",
                    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
                    text: value,
                    time: "now",
                    likes: 0,
                    liked: false,
                    replies: [],
                  },
                ],
              }
            : c
        );
      })
    );
    setReplyInputs(inputs =>
      inputs.map((arr, i) =>
        i === cardIdx
          ? arr.map((v, j) => (j === commentIdx ? "" : v))
          : arr
      )
    );
  };

  // Add new comment
  const handleInputChange = (idx: number, value: string) => {
    setCommentInputs(inputs => inputs.map((v, i) => (i === idx ? value : v)));
  };
  const handleSend = (idx: number) => {
    if (!commentInputs[idx].trim()) return;
    const newComment = {
      user: "You",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      text: commentInputs[idx],
      time: "now",
      likes: 0,
      liked: false,
      replies: [],
    };
    setComments(commentsArr =>
      commentsArr.map((arr, i) => (i === idx ? [...arr, newComment] : arr))
    );
    setCommentInputs(inputs => inputs.map((v, i) => (i === idx ? "" : v)));
    setReplyInputs(inputs =>
      inputs.map((arr, i) => (i === idx ? [...arr, ""] : arr))
    );
  };

  // Ensure replyInputs array matches comments array
  React.useEffect(() => {
    setReplyInputs(inputs =>
      comments.map((cardComments, i) =>
        Array(cardComments.length).fill("")
      )
    );
  }, [comments.length, comments.map(c => c.length).join(",")]);

  return (
    <AppLayout>
      <div className="w-full flex flex-col gap-6 pb-36 px-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen lg:max-w-lg lg:mx-auto lg:pb-8 lg:px-0">
        {/* Stories Row */}
        <div className="flex items-center gap-4 overflow-x-auto flex-nowrap py-2 px-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent scrollbar-hide">
          {stories.map((story, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[64px]">
              <div className={`w-14 h-14 rounded-full border-4 ${story.active ? 'border-fuchsia-500' : 'border-gray-300'} flex items-center justify-center shadow-md`}>
                <img src={story.img} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
              </div>
              <span className={`mt-1 text-xs font-bold ${story.active ? 'text-fuchsia-500' : 'text-gray-200 dark:text-gray-200'}`}>{story.name}</span>
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center w-full px-2">
          <button className="flex-1 px-7 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-fuchsia-600 font-bold border border-fuchsia-200 dark:border-gray-700 hover:bg-fuchsia-50 dark:hover:bg-gray-700 transition">Make Friends</button>
          <button className="flex-1 px-7 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-blue-600 font-bold border border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition">Search Partners</button>
        </div>
        {/* Featured Cards with Facebook-like Comments */}
        <div className="flex flex-col gap-8 w-full">
          {featuredCards.map((card, idx) => (
            <div key={idx} className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 mb-2 aspect-[4/3] flex flex-col justify-end w-full">
              <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <img src={card.avatar} alt={card.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <span className="text-white font-semibold drop-shadow-lg text-lg">{card.name}</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                <button className="bg-white/90 hover:bg-white text-fuchsia-500 rounded-full p-2 shadow-lg"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 4 13 5.09C13.5 4 14.96 3 16.5 3C19.5 3 22 5.5 22 8.5C22 13.5 12 21 12 21Z"/></svg></button>
                <button className="bg-white/90 hover:bg-white text-blue-500 rounded-full p-2 shadow-lg"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15A7 7 0 1 0 12 19.93"/></svg></button>
                <button className="bg-white/90 hover:bg-white text-gray-500 rounded-full p-2 shadow-lg"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></button>
                <button onClick={() => setOpenCommentBox(openCommentBox === idx ? null : idx)} className={`bg-white/90 hover:bg-white text-gray-500 rounded-full p-2 shadow-lg ${openCommentBox === idx ? 'ring-2 ring-fuchsia-400' : ''}`}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
              {/* Facebook-like Comment Section: only show when openCommentBox === idx */}
              {openCommentBox === idx && (
                <div
                  ref={el => { commentBoxRefs.current[idx] = el; }}
                  className="relative z-20 bg-white/90 dark:bg-gray-900/90 rounded-b-3xl px-4 pt-2 pb-4 flex flex-col gap-2"
                >
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                    {comments[idx].length === 0 && (
                      <div className="text-xs text-gray-400 text-center">No comments yet</div>
                    )}
                    {comments[idx].map((c, cidx) => (
                      <Comment
                        key={cidx}
                        comment={c}
                        onLike={() => handleLike(idx, cidx)}
                        onReply={() => {}}
                        replyInput={replyInputs[idx]?.[cidx] || ""}
                        setReplyInput={val => handleReplyInput(idx, cidx, val)}
                        onSendReply={() => handleSendReply(idx, cidx)}
                        depth={0}
                        replyIdx={cidx}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <img src="https://randomuser.me/api/portraits/men/23.jpg" alt="You" className="w-7 h-7 rounded-full object-cover border border-gray-200" />
                    <input
                      type="text"
                      value={commentInputs[idx]}
                      onChange={e => handleInputChange(idx, e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-sm shadow"
                    />
                    <button
                      onClick={() => handleSend(idx)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Spacer for fixed footer (mobile/tablet) or normal padding (desktop) */}
        <div className="h-32 lg:h-8" />
      </div>
      {/* Floating Bottom Navigation Bar (mobile/tablet), full width on desktop */}
      <nav className="fixed bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none lg:static lg:bottom-auto lg:left-auto lg:right-auto lg:w-full lg:justify-start lg:px-0 lg:pt-4 lg:pointer-events-auto">
        <div className="pointer-events-auto w-full max-w-xs mx-auto flex items-center justify-between bg-white/95 dark:bg-gray-900/95 px-2 py-3 rounded-full shadow-2xl border-t border-gray-200 dark:border-gray-800 lg:max-w-full lg:rounded-none lg:shadow-none lg:border-t-0 lg:mx-0 lg:px-0 lg:py-2">
          {navButtons.map((btn, idx) =>
            btn.center ? (
              <button
                key={btn.label}
                className="flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white rounded-full p-5 -mt-14 shadow-2xl border-4 border-white dark:border-gray-900 focus:outline-none w-20 h-20 z-10 lg:static lg:mt-0 lg:w-14 lg:h-14 lg:p-0 lg:bg-gradient-to-r lg:from-pink-400 lg:via-purple-400 lg:to-blue-400"
                style={idx === 2 ? { boxShadow: '0 8px 32px 0 rgba(128,90,213,0.18)' } : {}}
              >
                {btn.icon}
              </button>
            ) : (
              <button
                key={btn.label}
                className={`flex flex-col items-center flex-1 ${btn.active ? 'text-fuchsia-500 font-bold' : 'text-gray-400'} focus:outline-none lg:text-base lg:font-normal`}
              >
                {btn.icon}
                <span className="text-xs mt-1 lg:mt-0 lg:text-base">{btn.label}</span>
              </button>
            )
          )}
        </div>
      </nav>
      <style>{`
        /* Hide scrollbar for mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AppLayout>
  );
}
