import ResultsRow from "./ResultsRow";
import "./ResultsRows.css";

function ResultsRows({ items }) {
    return (
        <div className="results-rows">
            {items.map((item) => {
                return <ResultsRow label={item.label} value={item.value} />;
            })}
        </div>
    );
}

export default ResultsRows;
