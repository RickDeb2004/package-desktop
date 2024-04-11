
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
            {props.article.description}
          </p>
        </div>
      </div>
    </div>
  )
}