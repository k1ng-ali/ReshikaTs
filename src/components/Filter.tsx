import React, { Component } from 'react';

interface FilterProps {
    filter: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterState {
    active: boolean;
}

class Filter extends Component<FilterProps, FilterState> {
    constructor(props: FilterProps) {
        super(props);
        this.state = {
            active: false,
        };
    }

    setActive = () => {
        this.setState({ active: !this.state.active });
    };

    render() {
        const { filter } = this.props;
        return (
            <div>
                <div
                    className={`filter-item ${this.state.active ? 'item-active' : ''}`}
                    onClick={this.setActive}
                >
                    {filter}
                </div>
            </div>
        );
    }
}

export default Filter;