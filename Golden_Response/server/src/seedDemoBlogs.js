import mongoose from "mongoose";
import slugify from "slugify";
import { env } from "./config/env.js";
import Blog from "./models/Blog.js";
import User from "./models/User.js";

const posts = [
  {
    title: "Building AI Workflows That People Actually Trust",
    excerpt:
      "A practical look at designing AI-assisted workflows with clear handoffs, review points, and human control.",
    coverImage: "/uploads/seed-ai-workflows.svg",
    tags: ["AI", "Workflow", "Product"],
    content:
      "AI features become useful when people understand where automation starts, where judgment returns, and how to recover from mistakes.\n\nStart with narrow jobs, expose source material, and give reviewers simple choices. A reliable AI workflow feels less like magic and more like a strong draft from a thoughtful teammate.\n\nTeams that invest in feedback loops early also learn faster. They can compare accepted suggestions, rejected outputs, and recurring edits to decide what should be automated next."
  },
  {
    title: "Design Systems Are Really Decision Systems",
    excerpt:
      "Reusable components matter, but the deeper value of a design system is faster, calmer product decision-making.",
    coverImage: "/uploads/seed-design-systems.svg",
    tags: ["Design", "Frontend", "Systems"],
    content:
      "A design system is not just a library of buttons and cards. It is a shared memory for decisions the team should not have to remake every week.\n\nGood systems document intent as much as appearance: when to use a dense table, when a modal is too heavy, and how empty states should guide the next action. Those choices reduce debate and keep product work moving.\n\nThe strongest systems stay close to real product screens. They grow from repeated needs, not from imaginary completeness."
  },
  {
    title: "Remote Culture Runs on Better Defaults",
    excerpt:
      "Healthy remote teams rely on crisp defaults for meetings, writing, availability, and decision records.",
    coverImage: "/uploads/seed-remote-culture.svg",
    tags: ["Remote Work", "Teams", "Culture"],
    content:
      "Remote work gets hard when every interaction requires negotiation. The fix is not more meetings; it is better defaults.\n\nA team can decide which updates belong in writing, which decisions need a call, and how quickly people are expected to respond. These norms remove background anxiety and help people protect deep work.\n\nCulture shows up in the small repeatable choices. Clear agendas, recorded decisions, and respectful quiet hours do more than any poster ever could."
  },
  {
    title: "Performance Work Starts Before the Lighthouse Score",
    excerpt:
      "Page speed improves fastest when teams treat performance as a product constraint, not a cleanup chore.",
    coverImage: "/uploads/seed-performance.svg",
    tags: ["Performance", "Web", "Engineering"],
    content:
      "Performance is easiest to protect before a feature ships. Once a slow experience becomes normal, every fix has to fight user expectations, product pressure, and accumulated complexity.\n\nSet budgets for route size, image weight, and interaction delay. Then make those budgets visible during everyday development. A dashboard helps, but a fast feedback loop helps more.\n\nThe goal is not a perfect score. The goal is a product that feels responsive under real conditions for real users."
  },
  {
    title: "A Calm Node API Is Mostly Boring on Purpose",
    excerpt:
      "Reliable APIs usually come from predictable boundaries, validation, errors, and logs rather than clever routing tricks.",
    coverImage: "/uploads/seed-node-api.svg",
    tags: ["Node.js", "API", "Backend"],
    content:
      "A calm API is one where every request follows a familiar path: validate input, perform the smallest useful operation, return a predictable response, and log enough context to debug later.\n\nThat structure sounds ordinary because it should. Most production problems come from unclear contracts, missing validation, and errors that hide the real cause.\n\nWhen handlers stay small and middleware owns cross-cutting concerns, the codebase becomes easier to reason about under pressure."
  },
  {
    title: "Product Writing Turns Features Into Momentum",
    excerpt:
      "The words inside a product can reduce uncertainty, shape behavior, and make complex workflows feel approachable.",
    coverImage: "/uploads/seed-product-writing.svg",
    tags: ["Writing", "Product", "UX"],
    content:
      "Product writing is not decoration added at the end. It is part of the interface, and it can decide whether a user feels confident or stuck.\n\nStrong copy names the current state, makes the next action obvious, and avoids explaining the system more than the user needs. It respects attention.\n\nThe best product writing disappears into momentum. Users do not notice the sentence; they notice that they knew what to do next."
  }
];

function slugFor(title) {
  return slugify(title, { lower: true, strict: true, trim: true });
}

async function seed() {
  await mongoose.connect(env.MONGO_URI);

  let author = await User.findOne({ email: "demo.author@blogforge.local" });
  if (!author) {
    author = await User.create({
      name: "BlogForge Editorial",
      email: "demo.author@blogforge.local",
      password: "DemoPass123",
      bio: "A demo editorial account for seeded stories."
    });
  }

  const slugs = posts.map((post) => slugFor(post.title));
  await Blog.deleteMany({ slug: { $in: slugs } });

  await Blog.insertMany(
    posts.map((post, index) => ({
      ...post,
      slug: slugs[index],
      status: "published",
      author: author._id,
      publishedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000)
    }))
  );

  console.log(`Seeded ${posts.length} blogs with cover images.`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
