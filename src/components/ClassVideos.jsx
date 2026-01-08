export default function DemoVideos() {
  const videos = [
    // 🔹 Pandas Assignment
    {
      id: 'pandas-assign-1',
      title: 'Pandas Assignment - Part 1',
      url: 'https://www.youtube.com/embed/8pgAsGkL7mI',
      duration: '01:41:58',
    },
    {
      id: 'pandas-assign-2',
      title: 'Pandas Assignment - Part 2',
      url: 'https://www.youtube.com/embed/gCcGDktBST0',
      duration: '01:00:36',
    },
    {
      id: 'pandas-assign-3',
      title: 'Pandas Assignment - Part 3',
      url: 'https://www.youtube.com/embed/G4Ww5lQUMWI',
      duration: '01:19:50',
    },

    // 🔹 Pandas Fundamentals
    {
      id: 'pandas-fund-1',
      title: 'Pandas Fundamentals - Part 1',
      url: 'https://www.youtube.com/embed/CAedba0swHc',
      duration: '01:07:49',
    },
    {
      id: 'pandas-fund-2',
      title: 'Pandas Fundamentals - Part 2',
      url: 'https://www.youtube.com/embed/ACLf9h9NgrA',
      duration: '01:14:37',
    },
    {
      id: 'pandas-fund-3',
      title: 'Pandas Fundamentals - Part 3',
      url: 'https://www.youtube.com/embed/Y0Q0vLwmOkw',
      duration: '01:19:56',
    },

    // 🔹 Functions in Python
    {
      id: 'functions-1',
      title: 'Functions in Python - Part 1',
      url: 'https://www.youtube.com/embed/XIxDpAhsV7s',
      duration: '01:05:04',
    },
    {
      id: 'functions-2',
      title: 'Functions in Python - Part 2',
      url: 'https://www.youtube.com/embed/gOCZMZ_S6V4',
      duration: '01:24:12',
    },
    {
      id: 'functions-3',
      title: 'Functions in Python - Part 3',
      url: 'https://www.youtube.com/embed/Hm8zyBC1QtQ',
      duration: '01:22:28',
    },

    // 🔹 Lists in Python
    {
      id: 'lists-1',
      title: 'Lists in Python - Part 1',
      url: 'https://www.youtube.com/embed/PV49QoN8clQ',
      duration: '01:12:17',
    },
    {
      id: 'lists-2',
      title: 'Lists in Python - Part 2',
      url: 'https://www.youtube.com/embed/TZTcWIcn4Os',
      duration: '01:25:07',
    },
    {
      id: 'lists-3',
      title: 'Lists in Python - Part 3',
      url: 'https://www.youtube.com/embed/faTinioXEr0',
      duration: '01:12:18',
    },

    // 🔹 Dictionaries in Python
    {
      id: 'dict-1',
      title: 'CAP Theorem Explained',
      url: 'https://www.youtube.com/embed/Oa1k50OKmaM',
      duration: '01:24:43',
    },
    {
      id: 'dict-2',
      title: 'PACELC Theorem for System Design Interviews',
      url: 'https://www.youtube.com/embed/2PvjrkfPOTE',
      duration: '01:16:06',
    },
    {
      id: 'dict-3',
      title: 'Consistency Models Explained',
      url: 'https://www.youtube.com/embed/T6UwxVdZRHo',
      duration: '01:21:07',
    },

    // 🔹 NumPy Basics
    {
      id: 'numpy-1',
      title: 'AVL Trees Explained',
      url: 'https://www.youtube.com/embed/pHqwhMhyJv8',
      duration: '01:01:24',
    },
    {
      id: 'numpy-2',
      title: 'AVL Tree Rotations Explained',
      url: 'https://www.youtube.com/embed/Gmo4vF6DHIY',
      duration: '00:53:49',
    },
    {
      id: 'numpy-3',
      title: 'Red-Black Trees Explained',
      url: 'https://www.youtube.com/embed/4lyS4-dqAmo',
      duration: '01:28:55',
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        <SectionHeading
          highlight="Pandas Assignment"
          title="- Videos"
          subtitle="Understand Pandas concepts through hands-on assignments explained in detail."
        />
        <VideoRow videos={videos.slice(0, 3)} />

        <div className="mt-20" />

        <SectionHeading
          highlight="Pandas Fundamentals"
          title="- Videos"
          subtitle="Learn core Pandas concepts step by step with clear explanations."
        />
        <VideoRow videos={videos.slice(3, 6)} />

        <div className="mt-20" />

        <SectionHeading
          highlight="Functions in Python"
          title="- Videos"
          subtitle="Master Python functions through practical examples."
        />
        <VideoRow videos={videos.slice(6, 9)} />

        <div className="mt-20" />

        <SectionHeading
          highlight="Lists in Python"
          title="- Videos"
          subtitle="Understand Python lists step by step with clear explanations."
        />
        <VideoRow videos={videos.slice(9, 12)} />

        <div className="mt-20" />

        <SectionHeading
          highlight="System Design Interviews"
          title="- Videos"
          subtitle="Learn core system design principles like CAP, PACELC, and consistency models."
        />
        <VideoRow videos={videos.slice(12, 15)} />

        <div className="mt-20" />

        <SectionHeading
          highlight="Self-Balancing BST"
          title="- Videos"
          subtitle="Understand self-balancing BSTs including AVL trees and Red-Black trees."
        />
        <VideoRow videos={videos.slice(15, 18)} />

      </div>
    </section>
  );
}

/* 🔹 Section Heading */
function SectionHeading({ highlight, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-extrabold text-gray-900">
        <span className="text-[#AD1612]">{highlight}</span> {title}
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

/* 🔹 Video Row */
function VideoRow({ videos }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <VideoCard key={v.id} v={v} />
      ))}
    </div>
  );
}

/* 🔹 Video Card */
function VideoCard({ v }) {
  return (
    <article className="rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative aspect-video">
        <iframe
          className="h-full w-full"
          src={`${v.url}?rel=0&modestbranding=1`}
          title={v.title}
          loading="lazy"
          allowFullScreen
        />
      </div>

      <div className="p-3 flex items-center justify-between text-sm text-gray-700">
        <span className="font-medium line-clamp-1">{v.title}</span>
        <span className="text-xs text-gray-500">{v.duration}</span>
      </div>
    </article>
  );
}
