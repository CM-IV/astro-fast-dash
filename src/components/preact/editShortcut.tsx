import { useState, useEffect } from "preact/hooks";

const EditShortcut = ({ data }: any) => {
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");

    const setShortcut = () => {
        setName(data.name);
        setUrl(data.url);
        setThumbnail(data.thumbnail);
    }

    useEffect(() => {
        setShortcut();
    }, [])

    const changeShortcut = async (e: Event) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:8090/api/collections/shortcuts/records/${data.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    url: url,
                    thumbnail: thumbnail
                }),
            });
            window.location.replace("/");
        } catch (error) {
            console.error(error);
        }
    }

    const deleteShortcut = async (e: Event) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:8090/api/collections/shortcuts/records/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            window.location.replace("/");
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div class="card">
            <div class="card-header">
                <div class="card-header-title">
                    <h2 class="subtitle">Add a Shortcut</h2>
                </div>
            </div>
            <div class="card-content">
                <form onSubmit={changeShortcut}>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input
                            value={data.name}
                            onChange={(e) => setName(e.currentTarget.value)}
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
                            value={data.url}
                            onChange={(e) => setUrl(e.currentTarget.value)}
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
                            value={data.thumbnail}
                            onChange={(e) => setThumbnail(e.currentTarget.value)}
                            class="input" 
                            type="url"
                            required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-link" type="submit">Update</button>
                            <button class="button is-danger ml-2" onClick={deleteShortcut}>Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditShortcut;