
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../helpers/axios";


import { ReactComponent as ArrowSVG } from "../../styles/right-arrow-in-circular-button-svgrepo-com.svg";
function RecentlyAdded() {
  const query = useQuery("recently added videos", () => {
    return axiosInstance
      .get("/watch/list")
      .then((res) => res.data);
  });

  let carasol = useRef(null);
  const history = useHistory();

  const handleLeftClick = (e) => {
    carasol.current.scrollLeft += 250;
  };

  const handleRightClick = (e) => {
    carasol.current.scrollLeft -= 250;
  };

  if (query.isSuccess) {
    console.log(query.data);
    return (
      <div className="my-2 lg:doubleWidth w-full delay-100 flex relative max-h-40  h-40 opacity-10 hover:opacity-100 transition-all">
        <div className="hidden sm:flex flex-none bg-transparent h-40 w-16 flex justify-center items-center transition-colors cursor-pointer">
          <ArrowSVG
            onClick={handleRightClick}
            className="w-2/4 flex-none h-full fill-current transition text-gray-400 hover:text-white transform rotate-180"
          />
        </div>
        <div
          ref={carasol}
          style={{ scrollBehavior: "smooth" }}
          className="flex-auto rounded-md relative h-full  overflow-scroll no-scrollbar"
        >
          <div className="flex  doubleWidth">
            {query.data.data.map((item, idx) => {
              return (
                <>
                  <img
                    key={item.thumbnail}
                    className="opacity-80 hover:opacity-100 transition h-40 cursor-pointer select-none"
                    src={`${item.thumbnail}`}
                    onClick={() => history.push(`watch?v=${item.video_id}`)}
                  />
                </>
              );
            })}
          </div>
        </div>
        <div className="hidden sm:flex  flex-none bg-transparent h-40 w-16 flex justify-center items-center transition-colors cursor-pointer">
          <ArrowSVG
            onClick={handleLeftClick}
            className="w-2/4 h-full fill-current  transition text-gray-400 hover:text-white  transform rotate-270"
          />
        </div>
      </div>
    );
  } else {
    return <div>sd</div>;
  }
}

export default RecentlyAdded;
