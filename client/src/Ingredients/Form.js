import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: []
        }
    }

    uploadAction() {
        var data = new FormData();
        var imagedata = document
            .querySelector('input[type="file"]')
            .files[0];
        data.append("data", imagedata);
        

        fetch("/upload", {
                mode: 'no-cors',
                method: "POST",
                body: data
            }).then(function (res) {
            if (res.ok) {
                alert("Perfect! ");
            } else if (res.status === 401) {
                alert("Oops! ");
            }
        }, function (e) {
            alert("Error submitting form!");
        });
    }

    render() {
        return (
            <form
                ref='uploadForm'
                id='uploadForm'
                action='upload'
                method='post'
                encType="multipart/form-data">
                <input type="file" name="sampleFile"/>
                <div
                    onClick={this
                    .uploadAction
                    .bind(this)}>Upload</div>
            </form>
        );
    }
}
export default SearchForm;