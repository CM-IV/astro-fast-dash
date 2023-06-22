import { useState, useEffect } from "preact/hooks";
import type { ShortCutOutput } from "@utils/validator";
import Fuse from "fuse.js";

const SearchShortcuts = () => {
  const [searchData, setSearchData] = useState<ShortCutOutput[]>([]);
  const [shortcutData, setShortcutData] = useState<ShortCutOutput[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getShortcuts = async () => {
    try {
      const allShortcuts = await fetch(`/api/shortcuts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const shortcut = await allShortcuts.json();

      setSearchData(shortcut);
      setShortcutData(shortcut);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getShortcuts();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchData(shortcutData);
      return;
    }

    const options: Fuse.IFuseOptions<ShortCutOutput> = {
      includeScore: true,
      keys: ["name"],
    };

    const fuse = new Fuse(shortcutData, options);

    const result = fuse.search(query);
    const finalResult: ShortCutOutput[] = [];

    if (!result.length) {
      setSearchData(shortcutData);
    } else {
      result.forEach(({ item }) => {
        finalResult.push(item);
      });
      setSearchData(finalResult);
    }
  };

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 class="title">
            Welcome to <span class="text-gradient">Fast</span>Dash
          </h1>
          <h2 class="subtitle">
            By <a href="https://github.com/CM-IV">CM-IV</a>
          </h2>
        </div>
        <div className="column is-half">
          <article class="media">
            <div className="media-content">
              <div class="field search-bar">
                <div class="control has-icons-left">
                  <input
                    class="input is-rounded"
                    type="text"
                    placeholder="Search"
                    onInput={(e) => handleSearch(e.currentTarget.value)}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      {!isLoading ? (
        <>
          <h2 class="subtitle">Shortcuts</h2>
          <div class="tile is-ancestor">
            {searchData.map((s: ShortCutOutput) => {
              return (
                <div class="tile is-3 is-parent px-1 py-1">
                  <div class="tile is-child box is-justify-content-center">
                    <article class="media">
                      <figure class="media-left">
                        <p class="image is-32x32">
                          <img
                            class="is-rounded"
                            src={s.thumbnail}
                            alt="shortcut image"
                          />
                        </p>
                      </figure>
                      <div class="media-content">
                        <a href={s.url}>
                          <div class="content">
                            <p class="is-size-5 has-text-white">{s.name}</p>
                          </div>
                        </a>
                      </div>
                      <div className="media-right">
                        <a href={`/shortcuts/${s.id}/edit`}>
                          <span class="icon is-small mt-2">
                            <i class="fa fa-ellipsis-v has-text-white"></i>
                          </span>
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
        <svg
          version="1.1"
          id="L4"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          xmlSpace="preserve"
        >
          <circle fill="#ff3c4f" stroke="none" cx="6" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill="#ff3c4f" stroke="none" cx="26" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill="#ff3c4f" stroke="none" cx="46" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      )}
      {!isLoading && shortcutData.length == 0 && (
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
  );
};

export default SearchShortcuts;
