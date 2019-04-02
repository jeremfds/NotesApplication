import React, {ChangeEvent, Component, ReactNode} from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap';
import { MNote } from '../../../../models/notes';
import { NOTES } from '../../../../configs';
import './Search.scss';

interface IProps {
    searchNotes: (notes: MNote[]) => void;
}

interface ISearch {
    text: string;
    type: string;
    priority: string;
}

interface IState {
    search: ISearch;
    notes: MNote[];
}

class Search extends Component<IProps, IState> {
    private timeoutID: NodeJS.Timer;
    constructor(props: IProps) {
        super(props);
        this.state = {
            search: {
                text: '',
                type: '',
                priority: ''
            },
            notes: []
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.timeoutID = null;
    }

    resetSearch(): void {
        const notes: MNote[] = JSON.parse(window.localStorage.getItem(NOTES));
        this.setState({
            search: {
                text: '',
                type: '',
                priority: ''
            }
        }, () =>  this.props.searchNotes(notes));
    }

    applySearch(timeout: number): void {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        this.timeoutID = setTimeout(() => this.props.searchNotes(this.state.notes), timeout);
    }

    searchType(timeout: number): void {
        const notes: MNote[] = this.state.notes;
        const search: ISearch = this.state.search;
        if (search.type) {
            const filter: MNote[] = notes.filter(note => note.type === search.type);
            this.setState({notes: filter}, () => this.applySearch(timeout));
        } else {
            this.applySearch(timeout);
        }
    }

    searchPriority(timeout: number): void {
        const notes: MNote[] = this.state.notes;
        const search: ISearch = this.state.search;
        if (search.priority) {
            const filter: MNote[] = notes.filter(note => note.priority === search.priority);
            this.setState({notes: filter}, () => this.searchType(timeout));
        } else {
            this.searchType(timeout);
        }
    }

    search(): void {
        const notes: MNote[] = JSON.parse(window.localStorage.getItem(NOTES));
        const search: ISearch = this.state.search;
        if (search.text) {
            const filter: MNote[] = notes.filter(
                note => note.text.toUpperCase().includes(search.text.toUpperCase()) ||
                    note.title.toUpperCase().includes(search.text.toUpperCase()));
            this.setState({notes: filter}, () => this.searchPriority(500));
        } else {
            this.setState({notes: notes}, () => this.searchPriority(500));
        }
    }

    onChange(event: ChangeEvent<HTMLInputElement>): void {
        const field: string = event.target.name;
        const search: ISearch = this.state.search;
        const value: string = event.target.value;
        search[field] = field === 'text' ? value : value.charAt(0).toUpperCase() + value.slice(1);
        this.setState({search: search}, () => this.search());
    }

    onClick(): void {
        this.resetSearch();
    }

    render(): ReactNode {
        const search: ISearch = this.state.search;

        return (
            <Form className="search">
                <FormGroup>
                    <Input type="text"
                           name="text"
                           id="text"
                           placeholder="Search"
                           value={search.text}
                           onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="select"
                           name="type"
                           id="type"
                           value={search.type}
                           className="custom-select"
                           onChange={this.onChange}>
                        <option hidden defaultValue="--">Type</option>
                        <option>Work</option>
                        <option>Personal</option>
                        <option>Other</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select"
                           name="priority"
                           id="priority"
                           value={search.priority}
                           className="custom-select"
                           onChange={this.onChange}>
                        <option hidden defaultValue="--">Priority</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </Input>
                </FormGroup>
                <Button className="reset-button" onClick={this.onClick}>Reset</Button>
            </Form>
        )
    }
}

export default Search;