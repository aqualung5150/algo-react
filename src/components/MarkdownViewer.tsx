import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const MarkdownViewer = ({ markdown }: { markdown: string }) => {
  return (
    <div className="h-full w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // 코드 (```)
              <SyntaxHighlighter
                style={materialLight}
                language={match[1]}
                PreTag="div"
              >
                {String(children)
                  .replace(/\n$/, "")
                  .replace(/\n&nbsp;\n/g, "")
                  .replace(/\n&nbsp\n/g, "")}
              </SyntaxHighlighter>
            ) : (
              <SyntaxHighlighter
                style={materialLight}
                background="green"
                language="textile"
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
          // 인용문 (>)
          blockquote({ children, ...props }) {
            return (
              <blockquote
                style={{
                  background: "#7afca19b",
                  padding: "1px 15px",
                  borderRadius: "10px",
                }}
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          img({ ...props }) {
            return (
              <img
                style={{ maxWidth: "40vw" }}
                src={props.src?.replace("../../../../public/", "/")}
                alt="MarkdownRenderer__Image"
              />
            );
          },
          em({ children, ...props }) {
            return (
              <span style={{ fontStyle: "italic" }} {...props}>
                {children}
              </span>
            );
          },
        }}
      >
        {markdown
          .replace(/\n/gi, "\n\n")
          .replace(/\*\*/gi, "@$_%!^")
          .replace(/@\$_%!\^/gi, "**")
          .replace(/<\/?u>/gi, "*")}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
