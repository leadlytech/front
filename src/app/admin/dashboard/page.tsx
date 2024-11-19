"use client"
import { Rightbar } from "./rigthbar/page"
import { Transactions } from "./transactions/page";
import { Chart } from "./chart/page";
import { Card } from "./card/page";
import Sidebar from "./sidebar/page";

 const DashboardPage = () =>{
  return(
    <div className="flex gap-2 mt-2">
      <div className="flex-3 flex gap-2">   
        <div>
          <Card/>
        </div>
        <Transactions/>
        <Chart/>
      </div>
      <div>
        <Sidebar/>
      </div>
      <div className="flex-1">
        <Rightbar/>
      </div>
    </div>
  );
};

export default DashboardPage