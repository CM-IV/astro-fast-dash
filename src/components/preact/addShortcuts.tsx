import { useState } from "preact/hooks";

const AddShortcuts = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");

    const handleToggle = () => {
        setIsActive(!isActive);
    }

    const makeShortcut = async (e: Event) => {
        e.preventDefault();

        try {
            await fetch("/api/shortcuts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    url: url,
                    thumbnail: thumbnail
                }),
            });

            window.location.reload();
        } catch (error) {
            console.error(error)
        }
        
    }

    return (
        <div>
            <div class={isActive ? "modal is-active" : "modal"}>
                <div class="modal-background" onClick={handleToggle}></div>
                    <div class="modal-content">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-header-title">
                                    <h2 class="subtitle">Add a Shortcut</h2>
                                </div>
                            </div>
                            <div class="card-content">
                                <form onSubmit={makeShortcut}>
                                    <div class="field">
                                        <label class="label">Name</label>
                                        <div class="control">
                                            <input
                                            onChange={(e) => setName(e.currentTarget.value)}
                                            class="input" 
                                            type="text"
                                            defaultValue={""}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">URL</label>
                                        <div class="control">
                                            <input
                                            onChange={(e) => setUrl(e.currentTarget.value)}
                                            class="input" 
                                            type="url"
                                            defaultValue={""}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Thumbnail</label>
                                        <div class="control">
                                            <input
                                            onChange={(e) => setThumbnail(e.currentTarget.value)}
                                            class="input" 
                                            type="url"
                                            defaultValue={""}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <button class="button is-link" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            <button class="button is-rounded mt-5" onClick={handleToggle}>Add Shortcut</button>
        </div>
    )
}

export default AddShortcuts;