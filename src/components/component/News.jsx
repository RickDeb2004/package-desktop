
export default function News(props) {
  return (
    <div className="w-full py-6 space-y-4 md:py-12">
      <div className="container space-y-4 px-4 md:px-6">
        <div className="space-y-2">
            <div className="space-y-1">
                <h1 className="text-black text-4xl font-extrabold tracking-tighter sm:text-5xl/4xl sp:text-6xl/5xl">
                 {props.article.heading}
                </h1>
                <p className=" font-mono text-slate-800">{props.article.date}</p>
            </div>
            <div className="flex items-center space-x-2">
                <p className="font-semibold text-slate-700">{props.article.category}</p>
            </div>
        </div>
        <div className="prose max-w-none text-black font-semibold">
          <p>
            We're excited to announce Next.js 13, a major upgrade to the world's leading React framework. This release
            includes a complete overhaul of the developer experience, new features to supercharge frontend performance,
            and improved tools for building modern web applications.
          </p>
          <p>
            With Next.js 13, we've reimagined the entire developer workflow, making it easier than ever to build fast,
            beautiful web experiences with React. The new version introduces a range of powerful features designed to
            streamline the frontend development process, including a built-in design system, integrated component
            library, and automated code generation tools.
          </p>
          <p>
            We've also introduced a new
            
            that makes it simple to add optimized images to any Next.js app. The Image Component automatically resizes
            and optimizes images, making pages load faster and improving the overall performance of your site.
          </p>
        </div>
      </div>
    </div>
  )
}