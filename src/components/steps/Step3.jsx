import "./Step3.css";

function Step3({ data, updateField }) {
    const rows = data.tableRows || [];

    const addRow = () => {
        updateField("tableRows", [...rows, { col1: "", col2: "" }]);
    };

    const removeRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        updateField("tableRows", newRows);
    };

    const updateCell = (index, key, value) => {
        const newRows = rows.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );
        updateField("tableRows", newRows);
    };

    return (
        <div className="step3-container">
            <h2>Fill Table Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    type="text"
                                    value={row.col1}
                                    onChange={(e) =>
                                        updateCell(i, "col1", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.col2}
                                    onChange={(e) =>
                                        updateCell(i, "col2", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => removeRow(i)}
                                >
                                    ×
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={addRow}>
                + Add Row
            </button>
        </div>
    );
}

export default Step3;
