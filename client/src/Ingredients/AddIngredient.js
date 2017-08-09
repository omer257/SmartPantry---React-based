import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';
import {Link} from 'react-router-dom'; //Calling link to bind with router
import {inject, observer} from 'mobx-react';

@inject('ingredientsStore','routing')
@observer
export default class ingredientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemQuantity: '',
            itemType: '',
            itemDate: '',
            itemNameFetched: this.props.match.params.name
        }
    }
    createingredientsStore(e) {
        e.preventDefault();
        let state = this.state;
        this
            .props
            .ingredientsStore
            .createingredientsStore(state.itemName, state.itemQuantity, state.itemType, state.itemDate);
            this.props.routing.push('/ingredientsList')

    }
    render() {
        const {IngredientType, IngredientQuantity, validityType} = this.props.ingredientsStore;

        const validityTypeOptions = validityType.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ));
        const options = IngredientType.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ));
        const quantity = IngredientQuantity.map((item) => (
            <option key={item} value={item}>{item}</option>
        ));
        return (
            <section className="bg-primary text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-left">
                            <h2 className="section-heading">Add ingredient</h2>
                            <div className="text-center">
                                <Link to="/Watson">
                                    <img
                                        style={{
                                        width: '200px'
                                    }}
                                        src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/device-camera-icon.png"
                                        alt=""/>
                                    <h4 style={{color:'black'}}>Click here to load image</h4>
                                </Link>
                            </div>
                            <hr/>
                            <h3>Or type the details</h3>
                            <form
                                action="#"
                                id="getWeatherForm"
                                onSubmit={this
                                .createingredientsStore
                                .bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="email">Ingredient name:</label>
                                    <AutoComplete
                                        value={this.state.itemNameFetched}
                                        onChange={(value) => this.setState({itemName: value})}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemDate">Ingredient validity:</label>
                                    <select
                                        className="form-control"
                                        onChange={(event) => this.setState({itemDate: event.target.value})}
                                        id="itemDate" required>
                                        {validityTypeOptions}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemQuantity">Ingredient quantity:</label>
                                    <select
                                        className="form-control"
                                        onChange={(event) => this.setState({itemQuantity: event.target.value})}
                                        id="itemQuantity" required>
                                        {quantity}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemType">Ingredient type:</label>
                                    <select
                                        className="form-control"
                                        onChange={(event) => this.setState({itemType: event.target.value})}
                                        id="itemType" required>
                                        {options}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ingredientsList.propTypes = {
    ingredientsStore: PropTypes.shape({IngredientType: PropTypes.object.isRequired, IngredientQuantity: PropTypes.object.isRequired, validityType: PropTypes.object.isRequired})
};
