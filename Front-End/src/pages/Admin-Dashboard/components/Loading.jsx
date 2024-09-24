import logo from "../../../assets/logo.png";

function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[#2cd6bf] ">
        <div className="relative">
          <img src={logo} alt="Logo" className="w-48 h-48 animate-pulse" />
        </div>
        <div className="mt-4 flex text-black text-xl font-semibold">
          Loading
          <span className="mt-4 mr-2 flex space-x-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-black rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default Loading;
