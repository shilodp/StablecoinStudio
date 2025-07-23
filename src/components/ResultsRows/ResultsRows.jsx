import ResultsRow from "./ResultsRow";
import "./ResultsRows.css";

function ResultsRows({ items }) {
    return (
        <div className="results-rows">
            {items.map((item) => {
                return <ResultsRow key={item.label} label={item.label} value={item.value} />;
            })}
        </div>
    );
}

export default ResultsRows;
