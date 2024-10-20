import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFillArrowUpRightCircleFill, BsThreeDots } from "react-icons/bs";

const PieCards = ({ leaves }) => {
  const pieCards = [
    {
      remaining: leaves?.casual,
      typeOfLeave: "Students Present",
      title: "Total no. Of Students",
      color: "text-[#FF9085]",
      total: 75,
    },
    {
      remaining: leaves?.sick,
      typeOfLeave: "Attentive Students",
      title: "Students Attentive",
      color: "text-[#FFC444]",
      total: 60,
    },
    
  ];
  return (
    <div className="flex w-full justify-around -ml-20 -mr-20 ">
      {pieCards?.map((card, index) => (
        <div key={index} className="bg-blue-100 rounded-xl h-30 w-60 p-2 bigShadow"style={{ margin: '0 10px'}} >
          {/* 1 */}
          <div className="flex justify-between -m-0.5 p-0">
            <div className="font-semibold text-[#54548C] text-xs">
              {card.typeOfLeave}
            </div>
            <div className=" text-gray-400">
              <BsThreeDots className="font-bold text-lg" />
            </div>
          </div>
          {/* 2 */}
          <div className="flex p-2 justify-around -m-2 -p-1 ">
            <div className="flex-col px-2 mt-4">
              <div className="text-black font-bold text-left text-sm py-0">
                {card.total}
              </div>
              <div
                className={`text-xs ${card.color} text-left -my-1 mx-0 font-medium`}
              >
                {card.title}
              </div>
            </div>
            <div className="h-14 w-14 mb-3 font-bold text-lg">
              <CircularProgressbar
                value={(card.remaining / card.total) * 100}
                text={`${card.remaining}`}
                styles={buildStyles({
                  pathColor: `${card.color.substring(
                    6,
                    card.color.length - 1
                  )}`,
                  textColor: "black",
                  trailColor: "#F1F1FC",
                })}
              />
            </div>
          </div>
          {/* 3 */}
          <div className={`${card.color} -mt-6`}>
            <BsFillArrowUpRightCircleFill className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PieCards;


