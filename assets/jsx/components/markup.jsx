import React from 'react'

class Markup extends React.Component {
    render() {
        return (
            <div className="markup">
                <table>
                    <thead>
                        <tr><th>HTML</th><th>Function</th><th>Example</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{"<p>...</p>"}</td>
                            <td>Paragraph</td>
                            <td><p>This is what a paragraph looks like. </p></td>
                        </tr>
                        <tr>
                            <td>{"<b>...</b>"}</td>
                            <td>Bold</td>
                            <td><b>This is bold.</b></td>
                        </tr>
                        <tr>
                            <td>{"<i>...</i>"}</td>
                            <td>Italic</td>
                            <td><p>Italicized text</p></td>
                        </tr>
                        <tr>
                            <td>{"<u>...</u>"}</td>
                            <td>Underlined</td>
                            <td><u>This text is underlined.</u></td>
                        </tr>
                        <tr>
                            <td>{"<a href='[link]'>...</a>"}</td>
                            <td>Link</td>
                            <td><a href="http://google.ca">This is a link for google.</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Markup