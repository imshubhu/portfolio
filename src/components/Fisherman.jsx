// 🎣 Fisherman Image with Rod/Line
function Fisherman({ isFishing }) {
    return (
      <div className="relative w-72 h-72">
        {/* Fisherman illustration */}
        <img src="/fisherman.png" alt="Fisherman" className="w-full h-full object-contain" />
        {/* Fishing rod line overlay */}
      </div>
    );
  }

export default Fisherman