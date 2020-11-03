import React from 'react';
import Map from '../map/Map';
import List from '../list/List';

export default class SelectionManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            entityList: [
                {value: 'A', isSelected: false},
                {value: 'B', isSelected: false},
                {value: 'C', isSelected: false},
                {value: 'D', isSelected: false},
                {value: 'E', isSelected: false}
            ]
        }

        this.handleSelectList = this.handleSelectList.bind(this);
        this.handleSelectMap = this.handleSelectMap.bind(this);
    }

    handleSelectList(event){
        const index = parseInt(event.target.dataset.key);
        const {ctrlKey, shiftKey} = event;

        if(ctrlKey){
            this.selectMultiple([...this.getSelectedEntitiesIndex(), index]);
        }

        if(shiftKey){
            this.selectMultiple(this.getIndexesInRange(index, ...this.getSelectedEntitiesIndex()));
        }

        if(!shiftKey && !ctrlKey){
            this.selectSingle(index);
        }
    }

    handleSelectMap(event){
        const index = parseInt(event.target.dataset.key);
        const {shiftKey} = event;

        if(shiftKey && this.getSelectedEntitiesIndex().length <= 1){
            this.selectMultiple(this.getIndexesInRange(index, ...this.getSelectedEntitiesIndex()));
        } else {
            this.selectSingle(index);
        }
    }

    getIndexesInRange(firstIndex, lastIndex){
        const [min, max] = [Math.min(firstIndex, lastIndex), Math.max(firstIndex, lastIndex)];
        let indexes = [min];

        for(let i = min + 1; i <= max; i++){
            indexes.push(i);
        }

        return indexes;
    }

    getSelectedEntitiesIndex(){
        let selectedIndexes = [];

        this.state.entityList.forEach((e,i) => e.isSelected ? selectedIndexes.push(i) : null)

        return selectedIndexes;
    }

    selectSingle(index){
        this.setState({entityList: this.state.entityList.map((e, i) => ({...e, isSelected: index === i}))});
    }

    selectMultiple(indexsArray){
        this.setState({entityList: this.state.entityList.map((e, i) => ({...e, isSelected: indexsArray.indexOf(i) !== -1}))})
    }

    render(){
        return(
            <div className="container">
                <List entities={this.state.entityList} selectHandler={this.handleSelectList}></List>
                <Map entities={this.state.entityList} selectHandler={this.handleSelectMap}></Map>
            </div>
        )
    }
}
