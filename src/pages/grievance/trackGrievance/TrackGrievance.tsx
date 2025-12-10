import GrievanceList from "./GrievanceList";
import GrievanceStatistics from "./GrievanceStatistics";
import SearchGreivance from "./SearchGrievance";

export default function TrackGrievance() {
    return (
        <>
           <SearchGreivance />
           <GrievanceList/>
           <GrievanceStatistics />
        </>
    );
}
