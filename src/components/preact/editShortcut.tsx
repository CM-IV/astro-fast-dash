import { useState, useEffect } from "preact/hooks";

const EditShortcut = ({ data }: any) => {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const setShortcut = async () => {
    try {
      const shortcutData = await fetch(`/api/shortcuts/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const shortcut = await shortcutData.json();

      setName(shortcut.name);
      setUrl(shortcut.url);
      setThumbnail(shortcut.thumbnail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setShortcut();
  }, []);

  const changeShortcut = async (e: Event) => {
    e.preventDefault();

    try {
      await fetch(`/api/shortcuts/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          url: url,
          thumbnail: thumbnail,
        }),
      });
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteShortcut = async (e: Event) => {
    e.preventDefault();

    try {
      await fetch(`/api/shortcuts/${data}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="card">
      <div class="card-content">
        <form onSubmit={changeShortcut}>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
                class="input"
                type="text"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">URL</label>
            <div class="control">
              <input
                value={url}
                onInput={(e) => setUrl(e.currentTarget.value)}
                class="input"
                type="url"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Thumbnail</label>
            <div class="control">
              <input
                value={thumbnail}
                onInput={(e) => setThumbnail(e.currentTarget.value)}
                class="input"
                type="url"
                required
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" type="submit">
                Update
              </button>
              <button class="button is-danger ml-2" onClick={deleteShortcut}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShortcut;
