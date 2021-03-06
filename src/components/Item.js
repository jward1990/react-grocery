import React from 'react';
import ActionButton from './ActionButton';
import ButtonTypes from "../utils/buttonTypes";
import PropTypes from 'prop-types';

/**
 * The line item for a grocery item
 */
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            inEditState: false,
            name: this.props.name
        };

        // Bind functions
        this.propogateDelete = this.propogateDelete.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentDidUpdate() {
        if (this.state.inEditState) {
            this.editBox.select();
        }
    }

    propogateDelete() {
        // call list's remove handler
        this.props.removeHandler(this.props.id);
    }

    completeItem() {
        // set this.completed to true, add completed class
        this.setState({
            completed: true
        });
    }

    editItem() {
        this.setState({
            inEditState: true
        });
    }

    saveItem() {
        if (this.editBox.value && this.editBox.value.trim()) {
            this.setState({
                inEditState: false,
                name: this.editBox.value.trim()
            });
        }
    }

    selectItem() {
        console.log("item selected");
    }

    render() {
        let className = "list-item";
        const inEditState = this.state.inEditState;

        if (this.state.completed) {
            className += " completed";
        }

        if (inEditState) {
            className += " edit-state";
        }

        return (
            <li className={className} onClick={() => this.selectItem()}>
                {inEditState ? <input ref={(editBox) => this.editBox = editBox} type="text" defaultValue={this.state.name} /> : this.state.name}
                <ActionButton className={"edit-button"}
                    buttonType={ButtonTypes.EDIT}
                    buttonClickedHandler={this.editItem}
                />
                <ActionButton className={"save-button"}
                    buttonType={ButtonTypes.SAVE}
                    buttonClickedHandler={this.saveItem}
                />
                <div className={"button-panel"}>
                    <ActionButton className={"complete-button"}
                        buttonType={ButtonTypes.COMPLETED}
                        buttonClickedHandler={this.completeItem}
                    />
                    <ActionButton className={"delete-button"}
                        buttonType={ButtonTypes.DELETE}
                        buttonClickedHandler={this.propogateDelete}
                    />
                </div>
            </li>
        );
    }
}

Item.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    num: PropTypes.number,
    removeHandler: PropTypes.func
}

export default Item;
