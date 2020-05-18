import React, { useState } from 'react';

// $(document).ready(function () {
//     $('#search').focus(function () {
//         $('.search-box').addClass('border-searching');
//         $('.search-icon').addClass('si-rotate');
//     });
//     $('#search').blur(function () {
//         $('.search-box').removeClass('border-searching');
//         $('.search-icon').removeClass('si-rotate');
//     });
//     $('#search').keyup(function () {
//         if ($(this).val().length > 0) {
//             $('.go-icon').addClass('go-in');
//         } else {
//             $('.go-icon').removeClass('go-in');
//         }
//     });
//     $('.go-icon').click(function () {
//         $('.search-form').submit();
//     });
// });

const SearchBox = () => {
    const [isFocused, setFocused] = useState(false);
    const [goIn, setGoIn] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <div className="search-box__main-div">
            <div className="search-box__main">
                <div className="search-box__container">
                    <div
                        className={`search-box__search-box${
                            isFocused ? ' search-box__border-searching' : ''
                        }`}
                    >
                        <div
                            className={`search-box__search-icon${
                                isFocused ? ' search-box__si-rotate' : ''
                            }`}
                        >
                            <i className="fas fa-search" />
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(query);
                            }}
                            className="search-box__search-form"
                        >
                            <input
                                type="text"
                                placeholder="Search"
                                id="search-box__search"
                                autoComplete="off"
                                onFocus={() => {
                                    setFocused(true);
                                }}
                                onBlur={() => {
                                    setFocused(false);
                                }}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if (e.target.value.length > 0) {
                                        setGoIn(true);
                                    } else {
                                        setGoIn(false);
                                    }
                                }}
                                value={query}
                            />
                        </form>

                        <div
                            className={`search-box__go-icon${
                                goIn ? ' search-box__go-in' : ''
                            }`}
                            onClick={() => {
                                console.log(query);
                            }}
                        >
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
