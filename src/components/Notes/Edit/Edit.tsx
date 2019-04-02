import React, {ChangeEvent, Component, FormEvent, ReactNode} from 'react';
import {
    Container,
    Row,
    Col,
    Spinner,
    Card,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    UncontrolledAlert
} from 'reactstrap';
import { NOTES } from '../../../configs';
import { connect } from 'react-redux';
import { showNote, clearShowNote } from '../../../actions/notes/actionShowNote';
import { clearEditNote, editNote } from '../../../actions/notes/actionEditNote';
import { MNote } from '../../../models/notes';
import { MErrors } from '../../../models/utils';
import { IRootState, RTDispatch } from '../../../roots';
import { RouteComponentProps} from 'react-router';

interface IMatch  {
    id?: string;
}

interface IProps extends RouteComponentProps<IMatch> {
    note: MNote;
    successGetNote: boolean;
    successEditNote: boolean;
    notCompatibleGet: boolean;
    notCompatibleEdit: boolean;
    showNote: (id: number) => void;
    clearShowNote: () => void;
    editNote: (id: number, note: MNote) => void;
    clearEditNote: () => void;
}

interface IState {
    note: MNote;
    errors: MErrors;
    isEnabled: boolean;
    isLoading: boolean;
}

class Show extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            note: {
                id: 1,
                title: '',
                text: '',
                type: '',
                priority: '',
                date: '',
                version: 1
            },
            errors: {
                title: '',
                text: '',
                type: '',
                priority: ''
            },
            isEnabled: false,
            isLoading: true
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(): void {
        const id: number = parseInt(this.props.match.params.id);
        if (isNaN(id)) {
            this.props.history.push('/');
        } else {
            const notes: MNote[] = JSON.parse(window.localStorage.getItem(NOTES));
            if (notes !== null) {
                if (notes.some(note => note.id === id)) {
                    this.props.showNote(id);
                } else {
                    this.props.history.push('/');
                }
            } else {
                this.props.history.push('/');
            }
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (!Object.equals(nextProps.note, prevState.note)) {
            return {
                note: nextProps.note,
                isEnabled: true
            }
        }
        return null;
    }

    componentDidUpdate(prevProps: IProps): void {
        if (this.state.isLoading) {
            setTimeout(() => this.setState({isLoading: false}), 300);
        }
    }

    componentWillUnmount(): void {
        this.props.clearShowNote();
        this.props.clearEditNote();
    }

    validateForm(): void {
        const errors: MErrors = this.state.errors;
        const note: MNote = this.state.note;
        const hasErrors: boolean = Object.keys(errors).some((key: string) => errors[key] !== '');
        const emptyNote: boolean = Object.keys(note).some((key: string) => note[key] === '');
        this.setState({
            isEnabled: !hasErrors && !emptyNote
        });
    }

    validateField(name: string, value: string): void {
        let errors: MErrors = this.state.errors;
        switch (name) {
            case 'title':
                if (!value || value === '') {
                    errors[name] = 'Can\'t be blank';
                } else if (value.length < 2) {
                    errors[name] = 'Too short. 2 characters min.';
                } else if (value.length > 30) {
                    errors[name] = 'Too long. 30 characters max.';
                } else {
                    errors[name] = '';
                }
                break;
            case 'text':
                if (!value || value === '') {
                    errors[name] = 'Can\'t be blank';
                } else if (value.length < 5) {
                    errors[name] = 'Too short. 5 characters min.';
                } else if (value.length > 500) {
                    errors[name] = 'Too long. 500 characters max.';
                } else {
                    errors[name] = '';
                }
                break;
            case 'type':
                if (value.includes("Work") ||
                    value.includes("Personal") ||
                    value.includes("Other")) {
                    errors[name] = '';
                } else {
                    errors[name] = 'This type is not on the list.';
                }
                break;
            case 'priority':
                if (value.includes("High") ||
                    value.includes("Medium") ||
                    value.includes("Low")) {
                    errors[name] = '';
                } else {
                    errors[name] = 'This priority is not on the list.';
                }
                break;
            default:
                break;
        }
        this.setState({errors: errors}, () => this.validateForm());
    }

    onChange(event: ChangeEvent<HTMLInputElement>): void {
        const field: string = event.target.name;
        const note: MNote = this.state.note;
        const value: string = event.target.value;
        note[field] = value;
        this.setState({note: note}, () => this.validateField(field, value));
    }

    onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.state.isEnabled) {
            const note: MNote = this.state.note;
            note.version = note.version + 1;
            this.setState({isLoading: true}, () => this.props.editNote(note.id, note));
        }
    }

    render(): ReactNode {

        if (this.props.notCompatibleGet || this.props.notCompatibleEdit) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <p className="text-center">
                                Your browser is not compatible with the localStorage technology.
                            </p>
                        </Col>
                    </Row>
                </Container>
            )
        }

        if (this.state.isLoading) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Spinner />
                        </Col>
                    </Row>
                </Container>
            )
        }

        const note: MNote = this.state.note;
        const alertSuccessEditNote: ReactNode = (
            this.props.successEditNote ?
                (
                    <UncontrolledAlert color="success">
                        You successfully edited the note ✅
                    </UncontrolledAlert>
                ) : null
        );

        return (
            <Container className="create-note">
                <Row>
                    <Col>
                        <h1 className="text-center">Edit a note</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={{ size: 6, offset: 3 }}>
                        <Card>
                            {alertSuccessEditNote}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text"
                                           name="title"
                                           id="title"
                                           value={note.title}
                                           onChange={this.onChange}
                                           valid={note.title.length >= 2 && note.title.length <= 30}
                                           invalid={note.title.length < 2 && this.state.errors.title.length > 0
                                           || note.title.length > 30}
                                    />
                                    {
                                        this.state.errors.title &&
                                        <FormText color="danger">
                                            {this.state.errors.title}
                                        </FormText>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Text</Label>
                                    <Input type="textarea"
                                           name="text"
                                           id="text"
                                           value={note.text}
                                           onChange={this.onChange}
                                           valid={note.text.length >= 5 && note.text.length <= 500}
                                           invalid={note.text.length < 5 && this.state.errors.text.length > 0
                                           || note.text.length > 500}
                                    />
                                    {
                                        this.state.errors.text &&
                                        <FormText color="danger">
                                            {this.state.errors.text}
                                        </FormText>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="type">Type</Label>
                                    <Input type="select"
                                           name="type"
                                           id="type"
                                           value={note.type}
                                           onChange={this.onChange}
                                           className="custom-select"
                                           valid={
                                               note.type.includes("Work") ||
                                               note.type.includes("Personal") ||
                                               note.type.includes("Other")
                                           }>
                                        <option hidden defaultValue="--">--</option>
                                        <option>Work</option>
                                        <option>Personal</option>
                                        <option>Other</option>
                                    </Input>
                                    {
                                        this.state.errors.type &&
                                        <FormText color="danger">
                                            {this.state.errors.type}
                                        </FormText>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="priority">Priority</Label>
                                    <Input type="select"
                                           name="priority"
                                           id="priority"
                                           value={note.priority}
                                           onChange={this.onChange}
                                           className="custom-select"
                                           valid={
                                               note.priority.includes("High") ||
                                               note.priority.includes("Medium") ||
                                               note.priority.includes("Low")
                                           }>
                                        <option hidden defaultValue="--">--</option>
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </Input>
                                    {
                                        this.state.errors.priority &&
                                        <FormText color="danger">
                                            {this.state.errors.priority}
                                        </FormText>
                                    }
                                </FormGroup>
                                <Button className="purple-button"
                                        disabled={!this.state.isEnabled}>
                                    Edit the note
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

interface IStateToProps {
    note: MNote;
    successGetNote: boolean;
    notCompatibleGet: boolean;
    notCompatibleEdit: boolean;
    successEditNote: boolean;
}

interface IDispatchToProps {
    showNote: (id: number) => void;
    clearShowNote: () => void;
    editNote: (id: number, note: MNote) => void;
    clearEditNote: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    note: state.showNote.note,
    successGetNote: state.showNote.success,
    notCompatibleGet: state.showNote.notCompatible,
    notCompatibleEdit: state.editNote.notCompatible,
    successEditNote: state.editNote.success,
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    showNote: (id: number) => dispatch(showNote(id)),
    clearShowNote: () => dispatch(clearShowNote()),
    editNote: (id: number, note: MNote) => dispatch(editNote(id, note)),
    clearEditNote: () => dispatch(clearEditNote())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(Show);