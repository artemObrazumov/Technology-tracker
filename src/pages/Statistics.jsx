import "./Statistics.css";
import ProgressHeader from "../components/ProgressHeader";
import ProgressBar from "../components/ProgressBar";
import useTechnologies from "../hooks/useTechnologies";

function Statistics() {
  const {
    technologies,
    progress,
  } = useTechnologies();

  return (
    
    <div className="page statistic-page">
      <ProgressHeader technologies={technologies} />
      <ProgressBar progress={progress} />
    </div>
  );
}

export default Statistics;
