import React, {ChangeEvent, Component, FormEvent, ReactNode} from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
    Spinner,
    UncontrolledAlert
} from 'reactstrap';
import moment, { Moment } from 'moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearCreateNote, createNote } from '../../../actions/notes/actionCreateNote';
import { MNote } from '../../../models/notes';
import { MErrors } from '../../../models/utils';
import { IRootState, RTDispatch } from '../../../roots';
import './Create.scss';

interface IProps {
    success: boolean;
    notCompatible: boolean;
    createNote: (note: MNote) => void;
    clearCreateNote: () => void;
}

interface IState {
    note: MNote;
    errors: MErrors;
    imagesNumber: number;
    isEnabled: boolean;
    isLoading: boolean;
}

class Create extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            note: {
                id: 1,
                title: '',
                text: '',
                type: '',
                priority: '',
                date: 'date',
                version: 1,
                images: []
            },
            errors: {
                title: '',
                text: '',
                type: '',
                priority: '',
                image: ''
            },
            imagesNumber: 0,
            isEnabled: false,
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    componentDidUpdate(prevProps: IProps): void {
        if (this.state.isLoading) {
            if (prevProps.success !== this.props.success) {
                setTimeout(() =>
                    this.setState({
                        note: { id: 0, title: '', text: '', type: '', priority: '', date: 'date', version: 1, images: [] },
                        imagesNumber: 0,
                        isLoading: false,
                        isEnabled: false
                }), 300);
            }
        }
    }

    componentWillUnmount(): void {
        this.props.clearCreateNote();
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
                } else if (value.length > 1000) {
                    errors[name] = 'Too long. 1000 characters max.';
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

    validateImage(name: string, file: File): boolean {
        let errors: MErrors = this.state.errors;
        if (name === 'image') {
            if (['image/x-png', 'image/jpg', 'image/png', 'image/jpeg'].indexOf(file.type) === -1) {
                errors[name] = 'Image of type .png, .jpg, .jpeg only';
                this.setState({errors: errors});
                return false;
            } else if (file.size > 2097152) {
                errors[name] = 'Image size max 3 MB';
                this.setState({errors: errors});
                return false;
            } else {
                errors[name] = '';
                this.setState({errors: errors});
                return true;
            }
        }
        return false;
    }

    onChange(event: ChangeEvent<HTMLInputElement>): void {
        const field: string = event.target.name;
        const note: MNote = this.state.note;
        const value: string = event.target.value;
        note[field] = value;
        this.setState({note: note}, () => this.validateField(field, value));
    }

    getBase64 = (file: File): Promise<any> => {
        return new Promise((resolve: any , reject: any) => {
            const reader: any = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error: string) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    onChangeImage(event: ChangeEvent<HTMLInputElement>): void {
        const file: File = event.target.files[0];
        const note: MNote = this.state.note;
        this.getBase64(file).then(base64 => {
            const checkFile: boolean = this.validateImage('image', file);
            if (checkFile) {
                this.setState({imagesNumber: this.state.imagesNumber + 1},
                    () => note.images.push(base64.toString()));
            }
        });
    }

    onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.state.isEnabled) {
            const note: MNote = this.state.note;
            const timezone: string = moment.tz.guess() || 'Europe/London';
            const date: Moment = moment.tz(moment().toDate(), timezone);
            note.date = date.format('LLLL');
            this.props.clearCreateNote();
            this.setState({isLoading: true}, () => this.props.createNote(note));
        }
    }

    render(): ReactNode {

        if (this.props.notCompatible) {
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
        const alertSuccessCreatedNote: ReactNode = (
            this.props.success ?
                (
                    <UncontrolledAlert color="success">
                        You successfully created a note ✅
                    </UncontrolledAlert>
                ) : null
        );

        const successCreatedNote: ReactNode = (
            this.props.success ?
                (
                    <Link to={"/"} title="See my new note posted" className="new-note">← See my new posted note</Link>
                ) : null
        );

        return (
            <Container className="create-note">
                <Row>
                    <Col>
                        <h1 className="text-center">Create a note</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={{ size: 6, offset: 3 }}>
                        {successCreatedNote}
                        <Card>
                            {alertSuccessCreatedNote}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="title">Title <span className="red-color">*</span></Label>
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
                                    <Label for="text">Text <span className="red-color">*</span></Label>
                                    <Input type="textarea"
                                           name="text"
                                           id="text"
                                           value={note.text}
                                           onChange={this.onChange}
                                           valid={note.text.length >= 5 && note.text.length <= 1000}
                                           invalid={note.text.length < 5 && this.state.errors.text.length > 0
                                           || note.text.length > 1000}
                                    />
                                    {
                                        this.state.errors.text &&
                                        <FormText color="danger">
                                            {this.state.errors.text}
                                        </FormText>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="type">Type <span className="red-color">*</span></Label>
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
                                    <Label for="priority">Priority <span className="red-color">*</span></Label>
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
                                <FormGroup>
                                    <Label for="images">Images</Label>
                                    <Input type="file"
                                           id="images"
                                           name="images"
                                           onChange={this.onChangeImage}
                                    />
                                    {
                                        this.state.errors.image &&
                                        <FormText color="danger">
                                            {this.state.errors.image}
                                        </FormText>
                                    }
                                    <span className="number-images">
                                        {
                                            this.state.imagesNumber < 2 ? `${this.state.imagesNumber} image`:
                                                `${this.state.imagesNumber} images`
                                        }
                                    </span>
                                </FormGroup>
                                <p>
                                    <span className="red-color">*</span> required
                                </p>
                                <Button className="purple-button"
                                        disabled={!this.state.isEnabled}>
                                    Create the note
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
    success: boolean;
    notCompatible: boolean;
}

interface IDispatchToProps {
    createNote: (note: MNote) => void;
    clearCreateNote: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    success: state.createNote.success,
    notCompatible: state.createNote.notCompatible
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    createNote: (note: MNote) => dispatch(createNote(note)),
    clearCreateNote: () => dispatch(clearCreateNote())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(Create);