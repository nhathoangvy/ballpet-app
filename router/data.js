import React from 'react'

class DATA extends React.Component {
    render() {
        var db = [{"id":1,"slug": "react","name":"Bar","age":"30"},{"id":2,"slug": "react-router","name":"Baz","age":"40"}];
        return (
            <h1>{db}</h1>
        );
    }
}

export default DATA