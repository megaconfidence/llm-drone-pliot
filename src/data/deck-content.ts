import type { DeckContent } from "./types";

export const deckContent: DeckContent = {
  meta: {
    talkTitle: "LLM Is Now the Drone Pilot",
    subtitle: "What Could Go Wrong?",
    event: "Cascadia JS 2026",
    presenter: "Cokoghenun",
    presenterHandle: "megaconfidence",
  },
  slides: [
    // 1. Title
    {
      type: "title",
      title: "LLM Is Now the Drone Pilot",
      subtitle: "What Could Go Wrong?",
      event: "Cascadia JS 2026",
      presenter: "Confidence Okoghenun",
      presenterRole: "Senior developer advocate @ Cloudflare",
      ticker: [
        "natural language in",
        "plan created",
        "tools called",
        "real world responds",
        "agents that leave the chat box",
      ],
    },

    // 2. Drone Reveal
    {
      type: "drone-reveal",
      eyebrow: "cold open",
      heading: "The chat box grew propellers.",
      supporting: [
        "This is a DJI Tello: tiny, cheap, and very forgiving.",
        "That makes it a good way to see agency in the room.",
      ],
      labels: ["local hardware", "Wi-Fi", "SDK commands", "forgiving demo platform"],
    },

    // 3. Premise
    {
      type: "premise",
      heading: "The next interface is not just another chat box.",
      body: "Natural language is becoming a control surface for systems that used to require dashboards, manuals, scripts, or specialized operators.",
      cards: [
        { label: "Intent", description: "A person describes the outcome." },
        { label: "Plan", description: "The agent turns it into safe steps." },
        { label: "Action", description: "Tools make something happen." },
      ],
    },

    // 4. Progression
    {
      type: "progression",
      eyebrow: "from chatbot to agent",
      heading: "The meaningful jump is not raw intelligence.",
      stages: [
        { label: "Chatbot", description: "predicts text" },
        { label: "Tool-using assistant", description: "calls APIs" },
        { label: "Agent", description: "observes, decides, acts, remembers, repeats" },
        { label: "World agent", description: "changes the world, not just a database" },
      ],
    },

    // 5. Capabilities
    {
      type: "capabilities",
      heading: "Tools changed the shape of AI applications.",
      capabilities: [
        { label: "Tools", description: "APIs and devices become callable capabilities." },
        { label: "State", description: "The session remembers plans, status, and history." },
        { label: "Loops", description: "The agent can observe the result and take the next step." },
        { label: "Streams", description: "Humans can watch decisions and status in real time." },
      ],
      loop: ["observe", "reason", "act", "remember"],
      closing: "Better models matter. Better interfaces to action matter just as much.",
    },

    // 6. Positive Frame
    {
      type: "positive-frame",
      heading: "The optimistic version is not fewer humans.",
      body: "It is more people able to operate, explore, automate, and compose systems that used to be locked behind expertise or brittle interfaces.",
      cards: [
        { label: "Approachable", description: "Describe outcomes instead of memorizing controls." },
        { label: "Inspectable", description: "Plans, approvals, telemetry, and logs are visible." },
        { label: "Collaborative", description: "The agent proposes. The human approves." },
      ],
      highlight: "The agent proposes. The human approves.",
    },

    // 7. Contrast (Screens -> Scenes)
    {
      type: "contrast",
      eyebrow: "from screens to scenes",
      heading: "Software starts to feel spatial.",
      leftHeader: "Chat agent",
      rightHeader: "World agent",
      rows: [
        { left: "Answers questions", right: "Performs tasks" },
        { left: "Lives in a transcript", right: "Lives in an environment" },
        { left: "Uses APIs as abstractions", right: "Uses tools as capabilities" },
        { left: "Produces text", right: "Produces motion, sound, light, or change" },
        { left: "Feels like software", right: "Feels like a collaborator in the room" },
      ],
      caption: "The moment an agent moves something in the room, it stops feeling like a chatbot.",
    },

    // 8. Demo Goal
    {
      type: "demo-goal",
      heading: "Ask. Plan. Approve. Fly.",
      prompt: "Take off, fly to the green square, rotate to face the audience, and land.",
      steps: [
        "Natural-language request",
        "Agent creates a human-readable plan",
        "Human approves the plan",
        "Agent executes typed commands",
        "UI streams status and telemetry",
      ],
    },

    // 9. Live Demo
    {
      type: "live-demo",
      heading: "Live demo: agent flies a DJI Tello",
      commands: [
        "command",
        "takeoff",
        "forward 50cm",
        "cw 90deg",
        "forward 50cm",
        "cw 90deg",
        "forward 50cm",
        "cw 90deg",
        "forward 50cm",
        "land",
      ],
      telemetry: [
        { label: "battery", value: "84%" },
        { label: "height", value: "80cm" },
        { label: "state", value: "executing" },
        { label: "ack", value: "ok" },
      ],
      states: ["awaiting approval", "executing", "landed", "simulation"],
    },

    // 10. Demo Recap
    {
      type: "demo-recap",
      heading: "What just happened",
      summary:
        "An LLM read a natural-language prompt, broke it into typed tool calls, waited for human approval, executed each step through a small command vocabulary, and streamed telemetry back as the drone moved.",
      tags: [
        "natural language -> typed plan",
        "tool calls, not raw control",
        "human in the loop",
        "live telemetry",
        "stateful session",
      ],
    },

    // 11. Architecture
    {
      type: "architecture",
      heading: "The architecture is the pattern.",
      body: "Reasoning and state live in the agent. Timing-sensitive hardware I/O lives next to the hardware.",
      client: {
        id: "client",
        label: "Audience / Speaker Prompt",
        sublabels: ["natural language in"],
      },
      zones: {
        cloud: {
          label: "CLOUD",
          nodes: [
            {
              id: "ui",
              label: "Web UI / Demo Console",
              sublabels: ["plan preview", "approval", "ledger view"],
            },
            {
              id: "agent",
              label: "Cloudflare Agent",
              sublabels: [
                "conversation state",
                "command planner",
                "typed tool calls",
                "live session state",
              ],
              isCloudflare: true,
            },
          ],
        },
        local: {
          label: "LOCAL ROOM",
          nodes: [
            {
              id: "bridge",
              label: "Local Drone Bridge",
              sublabels: ["command translation", "timing + device I/O", "telemetry"],
            },
          ],
        },
      },
      drone: {
        id: "drone",
        label: "DJI Tello Drone",
        sublabels: ["UDP / Tello SDK"],
      },
      links: [
        { label: "natural language", from: "client", to: "ui" },
        { label: "WebSocket", from: "ui", to: "agent" },
        { label: "command queue", from: "agent", to: "bridge" },
        { label: "UDP / Tello SDK", from: "bridge", to: "drone" },
      ],
    },

    // 12. Approval
    {
      type: "approval",
      heading: "The agent proposes. The human approves.",
      plan: [
        "takeoff",
        "forward 50cm",
        "cw 90deg",
        "repeat square path",
        "rotate toward audience",
        "land",
      ],
      buttons: ["Approve plan", "Edit plan", "Cancel"],
      supporting:
        "Human approval makes world agents feel collaborative instead of reckless.",
    },

    // 13. Ledger + Telemetry
    {
      type: "ledger",
      heading: "If it can move, it needs a ledger.",
      ledger: [
        { time: "12:03:18", event: "plan.created" },
        { time: "12:03:24", event: "approval.granted" },
        { time: "12:03:25", event: "command.takeoff" },
        { time: "12:03:28", event: "ack.ok" },
        { time: "12:03:31", event: "command.forward 50cm" },
        { time: "12:03:34", event: "telemetry.height 80cm" },
        { time: "12:03:42", event: "command.land" },
      ],
      telemetry: [
        { label: "battery", value: "84%" },
        { label: "height", value: "80cm" },
        { label: "flight state", value: "executing" },
        { label: "ack", value: "ok" },
        { label: "last command", value: "forward 50cm" },
      ],
      closing: "Logs make demos rehearsable, bugs explainable, and actions auditable.",
    },

    // 14. Use Cases Beyond Drones
    {
      type: "use-cases",
      eyebrow: "beyond drones",
      heading: "What else could you connect an agent to?",
      cards: [
        {
          label: "Creative tools",
          description: "Camera sliders, lighting, framing, repeatable product-photography passes.",
        },
        {
          label: "Events and performance",
          description: "Lights, music, projections, and stage cues from a plain-language rundown.",
        },
        {
          label: "Education",
          description: "Safe robotics, drone, or science-lab exercises with step-by-step explanation.",
        },
        {
          label: "Accessibility",
          description: "Appliances, room controls, mobility devices, or maker tools through intent.",
        },
        {
          label: "Home and garden",
          description: "Sensors, irrigation, lights, fans, or a tiny desktop greenhouse.",
        },
        {
          label: "Labs and workshops",
          description: "Instrument runs, prerequisite checks, result logging, approval gates.",
        },
      ],
    },

    // 15. Use Cases (Higher Stakes)
    {
      type: "use-cases",
      heading: "The pattern scales beyond the toy version.",
      cards: [
        {
          label: "Manufacturing and prototyping",
          description: "CNC previews, 3D-printer preparation, inspection routines, robot-arm sequences.",
        },
        {
          label: "Field work",
          description: "Cameras, sensors, drones, and environmental monitors for agriculture, conservation, inspection, or disaster response.",
        },
        {
          label: "Operations",
          description: "Watch dashboards, compare sensor state to expected state, and propose physical interventions through approved tools.",
        },
        {
          label: "Classrooms",
          description: "Let students describe behavior and inspect the plan before the robot moves.",
        },
        {
          label: "Studios",
          description: "Coordinate lighting, audio, camera movement, and live cues.",
        },
        {
          label: "Homes and offices",
          description: "Make environments responsive without requiring everyone to use complex dashboards.",
        },
      ],
      safetyRail: ["typed tools", "simulation", "approval", "telemetry", "audit trail"],
      safetyLine:
        "Higher stakes require narrower tools, clearer approvals, better simulation, and stronger logs.",
    },

    // 16. Closing
    {
      type: "closing",
      headline: "Build agents that leave the chat box.",
      supporting: "The chat box was the beginning. The next interface might be the room around us.",
      paragraph:
        "The question is no longer whether LLMs can call APIs. They can. The fun question is what those APIs are connected to.",
      presenter: "Cokoghenun / megaconfidence",
      event: "Cascadia JS 2026",
      ticker: [
        "a drone",
        "a garden",
        "a camera",
        "a robot arm",
        "a lab bench",
        "a classroom project",
        "build agents that leave the chat box",
      ],
    },
  ],
};
