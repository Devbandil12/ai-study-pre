const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_AI_API_Key;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  const generationConfig2={
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
  }
  

   export const GenerateCourse = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a study material for reactjs for  the exam and level of difficulty  will be easy with summary of course, List of Chapters along with summery and emoji field  for each chapter, Topic list in each chapter. all result in  JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"courseSummary\": \"This study material provides a beginner-friendly introduction to ReactJS, covering fundamental concepts and preparing you for a basic proficiency exam.  We'll focus on building simple components and understanding the core principles of React's component-based architecture.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Introduction to React\",\n      \"emoji\": \"⚛️\",\n      \"summary\": \"This chapter introduces React, its core concepts, and why it's used for building user interfaces. We'll also set up our development environment.\",\n      \"topics\": [\n        \"What is React?\",\n        \"Why use React?\",\n        \"Setting up a React development environment (using Create React App)\",\n        \"JSX: JavaScript XML\",\n        \"Basic React component structure\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"JSX and Components\",\n      \"emoji\": \"🧱\",\n      \"summary\": \"This chapter dives deeper into JSX, the syntax extension used in React, and how to create reusable components.\",\n      \"topics\": [\n        \"Detailed explanation of JSX syntax\",\n        \"Creating functional components\",\n        \"Props: passing data to components\",\n        \"Component rendering and lifecycle (brief overview)\",\n        \"Simple component examples\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"State and Events\",\n      \"emoji\": \"🔄\",\n      \"summary\": \"This chapter covers managing data within components using state and handling user interactions with events.\",\n      \"topics\": [\n        \"Introducing component state using useState hook\",\n        \"Handling events (onClick, onChange, etc.)\",\n        \"Updating state using setState\",\n        \"Conditional rendering based on state\",\n        \"Simple state management examples\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Lists and Keys\",\n      \"emoji\": \"🧾\",\n      \"summary\": \"This chapter demonstrates how to render lists of data in React and the importance of keys for efficient rendering.\",\n      \"topics\": [\n        \"Rendering lists of data using map()\",\n        \"Understanding the importance of keys in lists\",\n        \"Avoiding common mistakes with keys\",\n        \"Dynamically updating lists\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Forms and Input Handling\",\n      \"emoji\": \"✍️\",\n      \"summary\": \"This chapter explores how to build forms in React and handle user input.\",\n      \"topics\": [\n        \"Controlled components\",\n        \"Handling form submission\",\n        \"Input validation (basic)\",\n        \"Working with different input types (text, checkbox, etc.)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Introduction to React Hooks (useState, useEffect)\",\n      \"emoji\": \"🎣\",\n      \"summary\": \"A brief introduction to essential React hooks for managing state and side effects.\",\n      \"topics\": [\n        \"useState hook in detail\",\n        \"useEffect hook basics (handling side effects)\",\n        \"Cleaning up effects with useEffect's return function (brief overview)\"\n      ]\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
    });
   
    export const GeneratingNotes = model.startChat({
      generationConfig2,

      history: [
        {
          role: "user",
          parts: [
            {text: "generate the answer of the following topics with almost 20-25 line  each topics,dont use any word include(`,'','), attach example with each topics in html formate(wihtout boiler plate) all data in json format, topics, description and example, topics:\n\"HTML structure (doctype, html, head, body)\",\n\"Common HTML tags (paragraphs, headings, links, images)\",\n\"Semantic HTML5 elements\",\n\"HTML attributes\""},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"topics\": [\n    {\n      \"topic\": \"HTML structure (doctype, html, head, body)\",\n      \"description\": \"The fundamental structure of an HTML document consists of the `<!DOCTYPE html>` declaration, the `<html>` root element, the `<head>` section containing metadata, and the `<body>` section holding the visible page content.  The `doctype` tells the browser which version of HTML is being used.  The `<head>` section includes information like the title, character set, and links to external stylesheets. The `<body>` contains all the content users see, including text, images, and interactive elements.  Proper structuring ensures better SEO, accessibility, and maintainability.\",\n      \"example\": \"<div><!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n  <meta charset=\\\"UTF-8\\\">\\n  <title>HTML Structure Example</title>\\n</head>\\n<body>\\n  <h1>My Webpage</h1>\\n  <p>This is a paragraph of text.</p>\\n</body>\\n</html></div>\"\n    },\n    {\n      \"topic\": \"Common HTML tags (paragraphs, headings, links, images)\",\n      \"description\": \"These tags form the building blocks of most web pages.  `<p>` creates paragraphs of text.  `<h1>` to `<h6>` are heading tags, with `<h1>` being the most important.  `<a>` creates hyperlinks using the `href` attribute to specify the URL.  `<img>` inserts images using the `src` attribute for the image source and `alt` for alternative text for accessibility.\",\n      \"example\": \"<div><h1>My Page Title</h1>\\n<p>This is a paragraph of text.</p>\\n<a href=\\\"https://www.example.com\\\">Link to Example</a>\\n<img src=\\\"image.jpg\\\" alt=\\\"Example Image\\\"></div>\"\n    },\n    {\n      \"topic\": \"Semantic HTML5 elements\",\n      \"description\": \"Semantic HTML5 elements provide meaning to the content they enclose rather than just visual presentation.  Examples include `<article>`, `<aside>`, `<nav>`, `<header>`, `<footer>`, `<section>`, and `<main>`.  Using these elements improves accessibility, SEO, and code readability by clearly defining the purpose of different sections of a webpage. They help assistive technologies understand the structure and context of the page.\",\n      \"example\": \"<div><header>\\n  <h1>My Website</h1>\\n  <nav>\\n    <a href=\\\"#\\\">Home</a>\\n    <a href=\\\"#\\\">About</a>\\n  </nav>\\n</header>\\n<main>\\n  <article>\\n    <h2>Article Title</h2>\\n    <p>Article content</p>\\n  </article>\\n  <aside>\\n    <p>Sidebar content</p>\\n  </aside>\\n</main>\\n<footer>\\n  <p>Copyright 2024</p>\\n</footer></div>\"\n    },\n    {\n      \"topic\": \"HTML attributes\",\n      \"description\": \"Attributes provide additional information about HTML elements.  They are written within the opening tag of an element in the form `attribute=\\\"value\\\".` Common attributes include `id`, `class`, `style`, `title`, `alt`, `href`, `src`, `target`.  `id` provides a unique identifier; `class` groups elements for styling; `style` applies inline styles; `title` adds tooltip text; `alt` provides alternative text for images; `href` specifies a link's destination; `src` specifies the source for images or scripts; `target` specifies where to open a link (e.g_ blank).\",\n      \"example\": \"<div><p id=\\\"myParagraph\\\" class=\\\"intro\\\" style=\\\"color:blue;\\\" title=\\\"This is a paragraph\\\">This is some text</p>\\n<a href=\\\"https://www.example.com\\\" target=\\\"_blank\\\">Link</a>\\n<img src=\\\"image.jpg\\\" alt=\\\"Description of image\\\"></div>\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    export const GeneratFlashCardAiModel = model.startChat({
      generationConfig2,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate the flash card for give topics in json format with front and back, minimum 15,\nintroduction to reactjs, states and props, routing, virtual dom"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"front\": \"What is ReactJS?\",\n    \"back\": \"ReactJS is a JavaScript library for building user interfaces (UIs), primarily for single-page applications. It's known for its component-based architecture and efficient rendering using a virtual DOM.\"\n  },\n  {\n    \"front\": \"What are JSX elements in React?\",\n    \"back\": \"JSX is a syntax extension to JavaScript that allows you to write HTML-like code within your JavaScript code.  React uses JSX to describe the UI structure.\"\n  },\n  {\n    \"front\": \"Explain the concept of components in React.\",\n    \"back\": \"Components are reusable building blocks of a React application. They encapsulate UI elements and logic, promoting modularity and reusability. They can be functional or class components.\"\n  },\n  {\n    \"front\": \"What is a state in React?\",\n    \"back\": \"State is an internal data structure that determines the component's output.  Changes to the state trigger re-renders of the component and its children.\"\n  },\n  {\n    \"front\": \"How do you update a component's state?\",\n    \"back\": \"Use the `setState()` method (in class components) or the `useState` hook (in functional components) to update the state.  React then efficiently updates the DOM.\"\n  },\n  {\n    \"front\": \"What are props in React?\",\n    \"back\": \"Props (short for properties) are data passed down from a parent component to a child component. They are read-only within the child component.\"\n  },\n  {\n    \"front\": \"What's the difference between state and props?\",\n    \"back\": \"State is internal to a component, managed by the component itself, and mutable. Props are external data passed to a component and immutable within that component.\"\n  },\n  {\n    \"front\": \"What is React Router used for?\",\n    \"back\": \"React Router is a library used to add client-side routing to React applications. It allows you to create single-page applications with multiple views that are updated without requiring a full page reload.\"\n  },\n  {\n    \"front\": \"Explain the concept of a route in React Router.\",\n    \"back\": \"A route defines a URL path and maps it to a specific component. When a user navigates to that URL, the corresponding component is rendered.\"\n  },\n  {\n    \"front\": \"How do you define a route in React Router (v6)?\",\n    \"back\": \"You typically use the `<Route>` component, specifying the `path` and `element` (the component to render).\"\n  },\n  {\n    \"front\": \"What is the Virtual DOM in React?\",\n    \"back\": \"The Virtual DOM is a lightweight in-memory representation of the real DOM. React uses it to efficiently update the actual DOM, minimizing direct manipulations and improving performance.\"\n  },\n  {\n    \"front\": \"How does the Virtual DOM improve performance?\",\n    \"back\": \"React first updates the Virtual DOM. It then compares this updated version to the previous Virtual DOM, identifying only the necessary changes.  Only these changes are applied to the real DOM.\"\n  },\n  {\n    \"front\": \"What is reconciliation in React?\",\n    \"back\": \"Reconciliation is the process of comparing the previous Virtual DOM with the updated Virtual DOM to determine the minimal set of changes needed to update the real DOM.  This is a key part of React's performance optimization.\"\n  },\n  {\n    \"front\": \"What are lifecycle methods in React class components?\",\n    \"back\": \"Lifecycle methods are special functions within React class components that get called at different stages of a component's existence (e.g., mounting, updating, unmounting).  They are less commonly used with functional components and hooks.\"\n  },\n  {\n    \"front\": \"Name at least three common React hooks.\",\n    \"back\": \"Examples include `useState`, `useEffect`, `useContext`, `useReducer`, `useCallback`, and `useMemo`.\"\n  }\n]\n```\n"},
          ],
        },
      ],

    })

    export   const GenerateQuiz = model.startChat({
      generationConfig2,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate the quiz from the given chapters along with answer, all data in json format, maximum 15 and minimum 10, chapters: introduction to reactjs, props and state, virtual dom"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"quiz\": [\n    {\n      \"question\": \"What does ReactJS primarily focus on building?\",\n      \"options\": [\"Server-side applications\", \"Mobile applications\", \"User interfaces\", \"Databases\"],\n      \"answer\": \"User interfaces\",\n      \"chapter\": \"Introduction to ReactJS\"\n    },\n    {\n      \"question\": \"What is a JSX expression?\",\n      \"options\": [\"A JavaScript function\", \"A way to embed HTML-like syntax within JavaScript\", \"A React component\", \"A type of React state\"],\n      \"answer\": \"A way to embed HTML-like syntax within JavaScript\",\n      \"chapter\": \"Introduction to ReactJS\"\n    },\n    {\n      \"question\": \"What is the core building block of React applications?\",\n      \"options\": [\"Functions\", \"Objects\", \"Components\", \"Modules\"],\n      \"answer\": \"Components\",\n      \"chapter\": \"Introduction to ReactJS\"\n    },\n    {\n      \"question\": \"What is the purpose of the 'props' in React?\",\n      \"options\": [\"To manage component state\", \"To pass data from a parent component to a child component\", \"To handle user events\", \"To define component styles\"],\n      \"answer\": \"To pass data from a parent component to a child component\",\n      \"chapter\": \"Props and State\"\n    },\n    {\n      \"question\": \"Are props mutable (changeable) within a child component?\",\n      \"options\": [\"Yes\", \"No\"],\n      \"answer\": \"No\",\n      \"chapter\": \"Props and State\"\n    },\n    {\n      \"question\": \"What is the purpose of 'state' in React?\",\n      \"options\": [\"To store and manage data within a component\", \"To define component styles\", \"To handle user events\", \"To pass data to parent components\"],\n      \"answer\": \"To store and manage data within a component\",\n      \"chapter\": \"Props and State\"\n    },\n    {\n      \"question\": \"How do you update the state in a functional component?\",\n      \"options\": [\"Directly assigning a new value to the state variable\", \"Using the setState function\", \"Modifying the state variable directly\", \"Using the updateState function\"],\n      \"answer\": \"Using the setState function\",\n      \"chapter\": \"Props and State\"\n    },\n    {\n      \"question\": \"What is the Virtual DOM?\",\n      \"options\": [\"A real DOM representation in the browser\", \"An in-memory representation of the real DOM\", \"A server-side rendering technique\", \"A type of JavaScript framework\"],\n      \"answer\": \"An in-memory representation of the real DOM\",\n      \"chapter\": \"Virtual DOM\"\n    },\n    {\n      \"question\": \"How does the Virtual DOM improve performance?\",\n      \"options\": [\"By directly manipulating the real DOM for every change\", \"By comparing the previous and current Virtual DOM and only updating necessary parts of the real DOM\", \"By eliminating the need for the real DOM\", \"By using server-side rendering\"],\n      \"answer\": \"By comparing the previous and current Virtual DOM and only updating necessary parts of the real DOM\",\n      \"chapter\": \"Virtual DOM\"\n    },\n    {\n      \"question\": \"What is reconciliation in the context of the Virtual DOM?\",\n      \"options\": [\"The process of creating the initial Virtual DOM\", \"The process of comparing the old and new Virtual DOMs to determine changes\", \"The process of rendering the Virtual DOM to the real DOM\", \"The process of destroying the Virtual DOM\"],\n      \"answer\": \"The process of comparing the old and new Virtual DOMs to determine changes\",\n      \"chapter\": \"Virtual DOM\"\n    },\n    {\n      \"question\": \"Which of these is NOT a benefit of using the Virtual DOM?\",\n      \"options\": [\"Improved performance\", \"Reduced memory usage\", \"Easier debugging\", \"Increased complexity\"],\n      \"answer\": \"Increased complexity\",\n      \"chapter\": \"Virtual DOM\"\n    },\n    {\n      \"question\": \"What is the key difference between useState and useEffect hooks?\",\n      \"options\": [\"useState manages component state, useEffect handles side effects\", \"useState handles side effects, useEffect manages component state\", \"Both manage component state\", \"Both handle side effects\"],\n      \"answer\": \"useState manages component state, useEffect handles side effects\",\n      \"chapter\": \"Props and State\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
