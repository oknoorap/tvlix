const ChannelSearch = () => {
  return (
    <div className="relative ml-4 w-1/2">
      <input
        type="search"
        placeholder="Search channels"
        className="w-full text-lg rounded-full focus:outline-none bg-white text-gray-500 placeholder-gray-400 disabled:bg-gray-200 py-2 px-5"
      />
    </div>
  );
};

export default ChannelSearch;
