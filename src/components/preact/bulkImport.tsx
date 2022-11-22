import type { ShortCutOutput } from "@src/utils/validator";
import { useState } from "preact/hooks";

const BulkImport = () => {
  const [shortcutData, setShortcutData] = useState<ShortCutOutput[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [msgData, setMsgData] = useState<any>();

  const bulkUploadShortcuts = async (e: Event) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/shortcuts/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortcutData,
        }),
      });

      const apiRes = await res.json();

      setMsgData(apiRes);

      if (apiRes.success == false) {
        setIsError(true);
        setMsgData(apiRes.error.issues[0].message);
        throw new Error();
      }

      setIsSuccess(true);

      setTimeout(function () {
        window.location.replace("/");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isError ? (
        <div class="notification is-danger">
          <p>
            There was an error, make sure you pass in a JSON array of objects
          </p>
          <p>{msgData}</p>
        </div>
      ) : null}
      {isSuccess ? (
        <div class="notification is-success">
          <p>Successfully added shortcuts, redirecting...</p>
        </div>
      ) : null}
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h2 class="subtitle">Bulk Import Shortcuts</h2>
          </div>
        </div>
        <div class="card-content">
          <form onSubmit={bulkUploadShortcuts}>
            <div class="field">
              <label class="label">JSON Array of Shortcuts</label>
              <div class="control">
                <textarea
                  id="bulkImport"
                  name="bulkImport"
                  class="textarea"
                  placeholder="Array of Objects"
                  rows={20}
                  onChange={(e) =>
                    setShortcutData(JSON.parse(e.currentTarget.value))
                  }
                ></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkImport;
