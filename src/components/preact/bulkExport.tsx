import { useState } from "preact/hooks";

const BulkExport = () => {
  const [shortcutData, setShortcutData] = useState<string>("");

  const bulkExportShortcuts = async (e: Event) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/shortcuts/bulk", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const apiRes = await res.json();
      setShortcutData(apiRes);

      console.log(apiRes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h2 class="subtitle">Bulk Export Shortcuts</h2>
          </div>
        </div>
        <div class="card-content">
          <form onSubmit={bulkExportShortcuts}>
            {shortcutData === "" ? null : (
              <div class="field">
                <label class="label">Shortcut Data</label>
                <textarea
                  className="textarea"
                  rows={20}
                  value={JSON.stringify(shortcutData, null, 2)}
                  readonly
                ></textarea>
              </div>
            )}
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">
                  Export
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkExport;
