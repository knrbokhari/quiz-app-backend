import { BadRequest } from "../../../../utils/error";
import ModuleModel from "../module/moduleModel";
import QuestionModel from "./questionModel";

export const createQuestionService = async (body: any) => {
  try {
    const result = await QuestionModel.findOne({
      slug: body.slug,
      moduleId: body.moduleId,
    });

    if (result) {
      throw new BadRequest("Already Created");
    }

    const created = await QuestionModel.create(body);
    await ModuleModel.findByIdAndUpdate(body.moduleId, {
      $push: { question: created._id },
    });

    return created;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getQuestionService = async (req: any) => {
  try {
    const result = await QuestionModel.findOne({
      id: req.params.moduleId,
    });

    if (!result) {
      throw new BadRequest("Question not found");
    }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const data = [
  ...[
    {
      question: "What is TypeScript?",
      slug: "what-is-typescript",
      moduleId: "60df3cfe6d4d88c8d2fefd80", // Replace with a valid ObjectId of a module
      options: [
        { id: 1, option: "A programming language that builds on JavaScript" },
        { id: 2, option: "A styling language" },
        { id: 3, option: "A database management tool" },
        { id: 4, option: "A version control system" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the file extension for TypeScript files?",
      slug: "typescript-file-extension",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: ".ts" },
        { id: 2, option: ".js" },
        { id: 3, option: ".java" },
        { id: 4, option: ".py" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which of the following is a TypeScript feature?",
      slug: "typescript-feature",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "Static typing" },
        { id: 2, option: "Dynamic typing" },
        { id: 3, option: "Inline styles" },
        { id: 4, option: "Server-side scripting" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you define a variable with a specific type in TypeScript?",
      slug: "define-variable-specific-type",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "let variableName: type;" },
        { id: 2, option: "var variableName: type;" },
        { id: 3, option: "const variableName: type;" },
        { id: 4, option: "variableName = new type();" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What does TypeScript transpile to?",
      slug: "typescript-transpile",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "JavaScript" },
        { id: 2, option: "Java" },
        { id: 3, option: "Python" },
        { id: 4, option: "C#" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you declare an interface in TypeScript?",
      slug: "declare-interface",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "interface InterfaceName { }" },
        { id: 2, option: "class InterfaceName { }" },
        { id: 3, option: "function InterfaceName() { }" },
        { id: 4, option: "type InterfaceName = { }" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which keyword is used to create a type alias in TypeScript?",
      slug: "type-alias-keyword",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "type" },
        { id: 2, option: "interface" },
        { id: 3, option: "alias" },
        { id: 4, option: "typedef" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you specify an optional property in a TypeScript interface?",
      slug: "optional-property-interface",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "propertyName?: type" },
        { id: 2, option: "propertyName: type | undefined" },
        { id: 3, option: "propertyName: type?" },
        { id: 4, option: "propertyName?: type | null" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you define a function type in TypeScript?",
      slug: "define-function-type",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "let functionName: (parameter: type) => returnType;" },
        {
          id: 2,
          option: "let functionName = (parameter: type) => returnType;",
        },
        {
          id: 3,
          option: "function functionName(parameter: type): returnType { }",
        },
        {
          id: 4,
          option: "const functionName: function(parameter: type): returnType;",
        },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of generics in TypeScript?",
      slug: "purpose-generics",
      moduleId: "60df3cfe6d4d88c8d2fefd80",
      options: [
        { id: 1, option: "To create reusable components" },
        { id: 2, option: "To enforce type safety" },
        { id: 3, option: "To provide dynamic typing" },
        { id: 4, option: "To improve performance" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
  ],
  ...[
    {
      question:
        "What is the primary way to handle state in a functional React component?",
      slug: "primary-state-functional-component",
      moduleId: "60df3cfe6d4d88c8d2fefd7f", // Replace with a valid ObjectId of a module
      options: [
        { id: 1, option: "Using the useState hook" },
        { id: 2, option: "Using the useReducer hook" },
        { id: 3, option: "Using the this.setState method" },
        { id: 4, option: "Using the componentDidMount method" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which hook is used for managing side effects in a React component?",
      slug: "hook-manage-side-effects",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "useEffect" },
        { id: 2, option: "useState" },
        { id: 3, option: "useReducer" },
        { id: 4, option: "useContext" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you initialize state with a value in the useState hook?",
      slug: "initialize-state-useState",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "const [state, setState] = useState(initialValue);" },
        { id: 2, option: "const [state, initialValue] = useState();" },
        { id: 3, option: "const state = useState(initialValue);" },
        { id: 4, option: "const [initialValue, setState] = useState();" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which hook would you use to manage complex state logic in a React component?",
      slug: "hook-complex-state-logic",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "useReducer" },
        { id: 2, option: "useState" },
        { id: 3, option: "useContext" },
        { id: 4, option: "useEffect" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of the useContext hook?",
      slug: "purpose-useContext",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "To access context values within a component" },
        { id: 2, option: "To manage side effects in a component" },
        { id: 3, option: "To initialize state in a component" },
        { id: 4, option: "To handle form submissions in a component" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which of the following is NOT a state management library for React?",
      slug: "not-state-management-library",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "Redux" },
        { id: 2, option: "MobX" },
        { id: 3, option: "Axios" },
        { id: 4, option: "Recoil" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you update state in a class component?",
      slug: "update-state-class-component",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "this.setState({ state: newState })" },
        { id: 2, option: "useState(newState)" },
        { id: 3, option: "setState(newState)" },
        { id: 4, option: "this.state = newState" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the use of the useReducer hook?",
      slug: "use-useReducer",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        {
          id: 1,
          option: "To manage state in a component with complex state logic",
        },
        { id: 2, option: "To access context values" },
        { id: 3, option: "To manage side effects" },
        { id: 4, option: "To initialize state" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How can you share state between multiple components in React?",
      slug: "share-state-multiple-components",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "Using the Context API" },
        { id: 2, option: "Using props" },
        { id: 3, option: "Using Redux" },
        { id: 4, option: "All of the above" },
      ],
      correctAnswerIndex: 4,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the primary purpose of Redux in React applications?",
      slug: "purpose-of-redux",
      moduleId: "60df3cfe6d4d88c8d2fefd7f",
      options: [
        { id: 1, option: "To manage application state in a centralized store" },
        { id: 2, option: "To manage side effects" },
        { id: 3, option: "To handle routing" },
        { id: 4, option: "To manage CSS styles" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
  ],
  ...[
    {
      question: "Which CSS property is used to create a flexible layout?",
      slug: "flexible-layout-property",
      moduleId: "60df3cfe6d4d88c8d2fefd7e", // Replace with a valid ObjectId of a module
      options: [
        { id: 1, option: "display: flex" },
        { id: 2, option: "display: grid" },
        { id: 3, option: "position: absolute" },
        { id: 4, option: "float: left" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which property is used to control the layout of items in a flex container?",
      slug: "layout-items-flex-container",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "justify-content" },
        { id: 2, option: "align-items" },
        { id: 3, option: "flex-direction" },
        { id: 4, option: "All of the above" },
      ],
      correctAnswerIndex: 4,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you create a grid container in CSS?",
      slug: "create-grid-container",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "display: grid" },
        { id: 2, option: "display: flex" },
        { id: 3, option: "display: block" },
        { id: 4, option: "display: inline-grid" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which CSS property is used to set the space between rows in a grid layout?",
      slug: "space-between-rows-grid",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "grid-row-gap" },
        { id: 2, option: "grid-gap" },
        { id: 3, option: "row-gap" },
        { id: 4, option: "gap" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you center an element horizontally in a flex container?",
      slug: "center-element-flex-container",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "justify-content: center" },
        { id: 2, option: "align-items: center" },
        { id: 3, option: "margin: auto" },
        { id: 4, option: "text-align: center" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of the CSS property `flex-grow`?",
      slug: "flex-grow-property",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        {
          id: 1,
          option: "To define the ability of a flex item to grow if necessary",
        },
        { id: 2, option: "To define the initial size of a flex item" },
        {
          id: 3,
          option: "To define the ability of a flex item to shrink if necessary",
        },
        { id: 4, option: "To define the order of the flex item" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which property would you use to create a fixed header that does not scroll with the page?",
      slug: "create-fixed-header",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "position: fixed" },
        { id: 2, option: "position: absolute" },
        { id: 3, option: "position: sticky" },
        { id: 4, option: "position: relative" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How can you create a layout with both rows and columns using CSS Grid?",
      slug: "rows-columns-css-grid",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "grid-template-areas" },
        { id: 2, option: "grid-template-rows and grid-template-columns" },
        { id: 3, option: "grid-template" },
        { id: 4, option: "All of the above" },
      ],
      correctAnswerIndex: 4,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which property is used to control the size of columns in a CSS Grid layout?",
      slug: "size-of-columns-grid",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "grid-template-columns" },
        { id: 2, option: "grid-column-size" },
        { id: 3, option: "grid-size-columns" },
        { id: 4, option: "grid-columns" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which CSS property is used to define the alignment along the main axis in a flex container?",
      slug: "alignment-main-axis-flex",
      moduleId: "60df3cfe6d4d88c8d2fefd7e",
      options: [
        { id: 1, option: "align-items" },
        { id: 2, option: "justify-content" },
        { id: 3, option: "align-content" },
        { id: 4, option: "align-self" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
  ],
  ...[
    {
      question: "What is Node.js?",
      slug: "what-is-node-js",
      moduleId: "60df3cfe6d4d88c8d2fefd7d", // Replace with a valid ObjectId of a module
      options: [
        {
          id: 1,
          option: "A JavaScript runtime built on Chrome's V8 JavaScript engine",
        },
        { id: 2, option: "A Python framework for web development" },
        { id: 3, option: "A Java library for building desktop applications" },
        { id: 4, option: "A PHP server-side scripting language" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which command is used to install Node.js packages?",
      slug: "install-node-packages",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "npm install" },
        { id: 2, option: "node install" },
        { id: 3, option: "install node" },
        { id: 4, option: "package install" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you import the HTTP module in Node.js?",
      slug: "import-http-module",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "var http = require('http');" },
        { id: 2, option: "import http from 'http';" },
        { id: 3, option: "http = require('http');" },
        { id: 4, option: "require http from 'http';" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which method is used to create a server in Node.js?",
      slug: "method-to-create-server",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "http.createServer()" },
        { id: 2, option: "http.serverCreate()" },
        { id: 3, option: "server.create()" },
        { id: 4, option: "createServer.http()" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the default port for a Node.js server?",
      slug: "default-nodejs-port",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "80" },
        { id: 2, option: "3000" },
        { id: 3, option: "8080" },
        { id: 4, option: "5000" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which of the following is a core module in Node.js?",
      slug: "core-module-in-nodejs",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "express" },
        { id: 2, option: "lodash" },
        { id: 3, option: "http" },
        { id: 4, option: "axios" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you handle asynchronous operations in Node.js?",
      slug: "handle-async-operations",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "Callbacks" },
        { id: 2, option: "Promises" },
        { id: 3, option: "Async/await" },
        { id: 4, option: "All of the above" },
      ],
      correctAnswerIndex: 4,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which of the following is used to read a file in Node.js?",
      slug: "read-file-in-nodejs",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "fs.readFile()" },
        { id: 2, option: "fileSystem.readFile()" },
        { id: 3, option: "node.readFile()" },
        { id: 4, option: "file.read()" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of the package.json file?",
      slug: "purpose-of-package-json",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "To list project dependencies and scripts" },
        { id: 2, option: "To specify Node.js version" },
        { id: 3, option: "To store environment variables" },
        { id: 4, option: "To configure the server" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which of the following is true about Node.js?",
      slug: "true-about-nodejs",
      moduleId: "60df3cfe6d4d88c8d2fefd7d",
      options: [
        { id: 1, option: "It is single-threaded and event-driven" },
        { id: 2, option: "It is multi-threaded and synchronous" },
        { id: 3, option: "It is single-threaded and synchronous" },
        { id: 4, option: "It is multi-threaded and event-driven" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
  ],
  ...[
    {
      question: "What is the purpose of the <canvas> element in HTML5?",
      slug: "purpose-of-canvas-element",
      moduleId: "60df3cfe6d4d88c8d2fefd7c", // Replace with a valid ObjectId of a module
      options: [
        {
          id: 1,
          option:
            "To draw graphics on the fly via scripting (usually JavaScript)",
        },
        { id: 2, option: "To embed multimedia content" },
        { id: 3, option: "To create a new section of the document" },
        { id: 4, option: "To define metadata about the HTML document" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which HTML5 element is used to play audio files?",
      slug: "element-to-play-audio",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<audio>" },
        { id: 2, option: "<sound>" },
        { id: 3, option: "<music>" },
        { id: 4, option: "<media>" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "What attribute is used in HTML5 to specify that an input field must be filled out?",
      slug: "input-field-required-attribute",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "placeholder" },
        { id: 2, option: "required" },
        { id: 3, option: "mandatory" },
        { id: 4, option: "validate" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which element is used to define navigation links in HTML5?",
      slug: "element-for-navigation-links",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<nav>" },
        { id: 2, option: "<menu>" },
        { id: 3, option: "<navigate>" },
        { id: 4, option: "<link>" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you embed a video file in HTML5?",
      slug: "embed-video-file",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<media src='movie.mp4'>" },
        { id: 2, option: "<video src='movie.mp4'>" },
        { id: 3, option: "<movie src='movie.mp4'>" },
        { id: 4, option: "<file src='movie.mp4'>" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of the <article> element in HTML5?",
      slug: "purpose-of-article-element",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        {
          id: 1,
          option:
            "To represent a self-contained piece of content that can be independently distributed or reused",
        },
        { id: 2, option: "To define a section in a document" },
        { id: 3, option: "To create a container for content" },
        { id: 4, option: "To define navigation links" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which element is used to define important text in HTML5?",
      slug: "element-for-important-text",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<strong>" },
        { id: 2, option: "<important>" },
        { id: 3, option: "<b>" },
        { id: 4, option: "<i>" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which HTML5 element is used to display a scalar measurement within a known range?",
      slug: "scalar-measurement-element",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<meter>" },
        { id: 2, option: "<gauge>" },
        { id: 3, option: "<range>" },
        { id: 4, option: "<progress>" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of the <section> element in HTML5?",
      slug: "purpose-of-section-element",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "To group together thematic content" },
        { id: 2, option: "To define a section in a document" },
        { id: 3, option: "To create a container for navigation links" },
        { id: 4, option: "To represent a self-contained piece of content" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which HTML5 element is used for rendering dynamic bitmap graphics on the fly?",
      slug: "dynamic-bitmap-graphics",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<canvas>" },
        { id: 2, option: "<svg>" },
        { id: 3, option: "<bitmap>" },
        { id: 4, option: "<graphic>" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which HTML5 element defines a header for a section or page?",
      slug: "element-for-header",
      moduleId: "60df3cfe6d4d88c8d2fefd7c",
      options: [
        { id: 1, option: "<header>" },
        { id: 2, option: "<head>" },
        { id: 3, option: "<h1>" },
        { id: 4, option: "<title>" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
  ],
  ...[
    {
      question: "What is the primary purpose of React hooks?",
      slug: "purpose-of-react-hooks",
      moduleId: "60df3cfe6d4d88c8d2fefd7b", // Replace with a valid ObjectId of a module
      options: [
        {
          id: 1,
          option:
            "To manage state and lifecycle methods in functional components",
        },
        { id: 2, option: "To directly manipulate the DOM" },
        { id: 3, option: "To perform HTTP requests" },
        { id: 4, option: "To create CSS styles" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which hook would you use to handle side effects in a functional component?",
      slug: "hook-for-side-effects",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "useState" },
        { id: 2, option: "useReducer" },
        { id: 3, option: "useEffect" },
        { id: 4, option: "useContext" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the correct way to use the useContext hook?",
      slug: "usecontext-hook-usage",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "const value = useContext(MyContext);" },
        { id: 2, option: "const value = useContext();" },
        { id: 3, option: "const value = useContext([MyContext]);" },
        { id: 4, option: "const value = useContext(MyContext, []);" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which hook allows you to create a memoized function?",
      slug: "memoized-function-hook",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "useMemo" },
        { id: 2, option: "useCallback" },
        { id: 3, option: "useReducer" },
        { id: 4, option: "useState" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you pass data from a parent component to a child component in React?",
      slug: "pass-data-parent-to-child",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "Using context" },
        { id: 2, option: "Using props" },
        { id: 3, option: "Using state" },
        { id: 4, option: "Using ref" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "What is the purpose of useRef hook?",
      slug: "purpose-of-useref-hook",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        {
          id: 1,
          option:
            "To store a mutable value that does not cause a re-render when updated",
        },
        { id: 2, option: "To access the previous state value" },
        { id: 3, option: "To perform side effects after component updates" },
        { id: 4, option: "To manage context in the component" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which hook should be used to handle complex state logic in React?",
      slug: "handle-complex-state-logic",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "useState" },
        { id: 2, option: "useReducer" },
        { id: 3, option: "useEffect" },
        { id: 4, option: "useContext" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you prevent unnecessary re-renders of a component in React?",
      slug: "prevent-unnecessary-re-renders",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "Using useEffect" },
        { id: 2, option: "Using React.memo" },
        { id: 3, option: "Using useCallback" },
        { id: 4, option: "Using useState" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which hook would you use to optimize the performance of a function that is called on every render?",
      slug: "optimize-function-performance",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "useEffect" },
        { id: 2, option: "useState" },
        { id: 3, option: "useMemo" },
        { id: 4, option: "useCallback" },
      ],
      correctAnswerIndex: 4,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "How do you share state logic between multiple components in React?",
      slug: "share-state-logic",
      moduleId: "60df3cfe6d4d88c8d2fefd7b",
      options: [
        { id: 1, option: "Using state" },
        { id: 2, option: "Using props" },
        { id: 3, option: "Using custom hooks" },
        { id: 4, option: "Using context" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
  ],
  ...[
    {
      question: "What is the output of 'console.log(typeof null)'?",
      slug: "output-of-typeof-null",
      moduleId: "60df3cfe6d4d88c8d2fefd7a", // Replace with a valid ObjectId of a module
      options: [
        { id: 1, option: "object" },
        { id: 2, option: "null" },
        { id: 3, option: "undefined" },
        { id: 4, option: "number" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which company developed JavaScript?",
      slug: "company-developed-javascript",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "Microsoft" },
        { id: 2, option: "Sun Microsystems" },
        { id: 3, option: "Netscape" },
        { id: 4, option: "Oracle" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'app.js'?",
      slug: "syntax-external-script",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "<script href='app.js'></script>" },
        { id: 2, option: "<script src='app.js'></script>" },
        { id: 3, option: "<script ref='app.js'></script>" },
        { id: 4, option: "<script name='app.js'></script>" },
      ],
      correctAnswerIndex: 2,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which of the following is not a reserved word in JavaScript?",
      slug: "not-reserved-word",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "interface" },
        { id: 2, option: "throws" },
        { id: 3, option: "program" },
        { id: 4, option: "short" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      slug: "hello-world-alert",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "msgBox('Hello World');" },
        { id: 2, option: "alertBox('Hello World');" },
        { id: 3, option: "msg('Hello World');" },
        { id: 4, option: "alert('Hello World');" },
      ],
      correctAnswerIndex: 4,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which built-in method returns the length of the string?",
      slug: "method-returns-length",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "length()" },
        { id: 2, option: "size()" },
        { id: 3, option: "index()" },
        { id: 4, option: "None of the above" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which of the following is a valid type in JavaScript?",
      slug: "valid-type",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "number" },
        { id: 2, option: "float" },
        { id: 3, option: "double" },
        { id: 4, option: "None of the above" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
    {
      question:
        "Which method is used to round a number to its nearest integer?",
      slug: "round-method",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "ceil()" },
        { id: 2, option: "floor()" },
        { id: 3, option: "round()" },
        { id: 4, option: "None of the above" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      slug: "assign-operator",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "*" },
        { id: 2, option: "-" },
        { id: 3, option: "=" },
        { id: 4, option: "+" },
      ],
      correctAnswerIndex: 3,
      mark: 1,
      copyPast: 0,
    },
    {
      question: "How can you add a comment in JavaScript?",
      slug: "add-comment",
      moduleId: "60df3cfe6d4d88c8d2fefd7a",
      options: [
        { id: 1, option: "// This is a comment" },
        { id: 2, option: "<!-- This is a comment -->" },
        { id: 3, option: "' This is a comment" },
        { id: 4, option: "** This is a comment" },
      ],
      correctAnswerIndex: 1,
      mark: 1,
      copyPast: 0,
    },
  ],
];

// const createQuestionsAndUpdateModule = async () => {
//   try {
//     for (const i of data) {
//       const created = await QuestionModel.updateOne(
//         { slug: i.slug },
//         { options: i.options },
//         { new: true }
//       );

//       let newData: any = await QuestionModel.findOne({ slug: i.slug });
//       console.log(newData);
//     }
//   } catch (error) {
//     console.error("Error creating questions and updating module:", error);
//   }
// };

// createQuestionsAndUpdateModule();
