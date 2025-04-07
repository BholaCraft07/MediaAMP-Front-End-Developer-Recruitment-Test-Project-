import GameLayout from "../pages/GameLayout";

function Hero({ isOpen }) {

  return (
    <div
      className={`hero text-white px-5 positon-sticky z-1`}
      style={{
        top: "60px",
        width: isOpen ? "calc(100% - 200px)" : "100%",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Header Title */}

      <div className="py-0 d-flex align-items-center ">
        <h2 className="fw-bold m-auto my-2">Game Store</h2>
      </div>
      <GameLayout/>
    </div >
  );
}

export default Hero;