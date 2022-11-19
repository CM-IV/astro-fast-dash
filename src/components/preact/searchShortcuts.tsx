import { useState, useEffect } from "preact/hooks";
import type { Shortcut } from "../../types";
import Fuse from "fuse.js";

const SearchShortcuts = () => {

    const [searchData, setSearchData] = useState<Shortcut[]>([]);
    const [shortcutData, setShortcutData] = useState<Shortcut[]>([]);

    const getShortcuts = async () => {

        try {
            const allShortcuts = await fetch(`/api/shortcuts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const shortcut = await allShortcuts.json();
            console.log(shortcut)

            setSearchData(shortcut);
            setShortcutData(shortcut);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getShortcuts();
    }, [])

    const handleSearch = (query: string) => {

        if (!query) {
          setSearchData(shortcutData);
          return;
        }
    
        const options: Fuse.IFuseOptions<Shortcut> = {
          includeScore: true,
          keys: ['name']
        }
      
        const fuse = new Fuse(shortcutData, options);
    
        const result = fuse.search(query);
        const finalResult: Shortcut[] = [];
    
    
        if (!result.length) {
          setSearchData(shortcutData);
        } else {
          result.forEach(({ item }) => {
            finalResult.push(item);
          });
          setSearchData(finalResult);
        }
    
      }
    

    return (
        <>
        <div className="columns is-centered">
            <div className="column is-half">
                <section class="section">
                    <h1 class="title">Welcome to <span class="text-gradient">Fast</span>Dash</h1>
                    <h2 class="subtitle">By <a href="https://github.com/CM-IV">CM-IV</a></h2>
                </section>
            </div>
            <div className="column is-half">
                <article class="media mt-6">
                    <div className="media-content">
                        <div class="field search-bar">
                            <div class="control">
                                <input 
                                class="input is-rounded" 
                                type="text" 
                                placeholder="Search" 
                                onChange={(e) => handleSearch(e.currentTarget.value)}
                                />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
			{searchData.length > 0 ? (
					<>
                        <h2 class="subtitle">Shortcuts</h2>
                        <div class="tile is-ancestor">
                        {searchData.map((s: Shortcut) => {
                            return (
                                <div class="tile is-3 is-parent px-1 py-1">
                                    <div class="tile is-child box">
                                        <article class="media">
                                            <figure class="media-left">
                                                <p class="image is-32x32">
                                                    <img class="is-rounded" src={s.thumbnail} />
                                                </p>
                                            </figure>
                                            <div class="media-content">
                                                <a href={s.url}>
                                                    <div class="content">
                                                        <p class="is-size-5 has-text-black">{s.name}</p>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="media-right">
                                                <a href={`/shortcuts/${s.id}/edit`}>
                                                    <button class="button">View</button>
                                                </a>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
			) : (
				<div class="columns is-centered">
					<div class="column is-half">
						<article class="message is-info">
							<div class="message-header">
								<p>Info</p>
							</div>
							<div class="message-body">
								You do not have any shortcuts, please add some.
							</div>
						</article>
					</div>
				</div>
			)}
        </>
    )
}


export default SearchShortcuts;