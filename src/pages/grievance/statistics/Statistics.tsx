import AverageResolutionTime from "./AverageResolution";
import DetailedBreakdown from "./DetailedBreakdown";
import DistributionCharts from "./DistributionCharts";
import Filter from "./Filter";
import NatureDistributionChart from "./NatureDistributionChart";
import OfficeGrievanceChart from "./OfficeCharts";
import StatisticsBox from "./Statisticsbox";

export default function Statistics(){
    return (
        <>
            <Filter />
            <StatisticsBox />
            <AverageResolutionTime/>
            <DistributionCharts />
            <NatureDistributionChart />
            <OfficeGrievanceChart />
            <DetailedBreakdown />
        </>
    )
}