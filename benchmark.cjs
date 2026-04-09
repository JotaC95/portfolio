const { performance } = require('perf_hooks');

const projectsData = [
    {
        id: 1,
        category: "Software",
        tech: ["React Native", "Expo", "Supabase", "TypeScript"],
    },
    {
        id: 2,
        category: "Data",
        tech: ["React", "Node.js", "SQL", "Dashboard"],
    },
    {
        id: 3,
        category: "Software",
        tech: ["React", "Tailwind", "UX/UI"],
    },
    {
        id: 4,
        category: "Automation",
        tech: ["React", "Portfolio", "Design"],
    },
    {
        id: 5,
        category: "IoT",
        tech: ["AI", "Python", "Computer Vision", "GPS"],
    },
    {
        id: 6,
        category: "HealthTech",
        tech: ["React", "WebRTC", "Node.js", "HealthTech"],
    }
];

const t = {
    projects: {
        list: Array(6).fill({ title: "Project Title", problem: "Problem desc" })
    }
};

const iterations = 1000000;

console.log(`Simulating ${iterations} component renders...`);

const start1 = performance.now();
let dummy1 = null;
for (let i = 0; i < iterations; i++) {
    const projects = projectsData.map((p, index) => ({
        ...p,
        ...t.projects.list[index]
    }));
    dummy1 = projects;
}
const end1 = performance.now();
const timeWithout = end1 - start1;
console.log(`Without useMemo: ${timeWithout.toFixed(2)}ms`);

const start2 = performance.now();
let dummy2 = null;
let lastDeps = null;
let memoizedValue = null;

for (let i = 0; i < iterations; i++) {
    const currentDeps = t.projects.list;
    if (lastDeps !== currentDeps) {
        memoizedValue = projectsData.map((p, index) => ({
            ...p,
            ...t.projects.list[index]
        }));
        lastDeps = currentDeps;
    }
    dummy2 = memoizedValue;
}
const end2 = performance.now();
const timeWith = end2 - start2;
console.log(`With useMemo: ${timeWith.toFixed(2)}ms`);

console.log(`Improvement: ${((timeWithout - timeWith) / timeWithout * 100).toFixed(2)}% faster`);
