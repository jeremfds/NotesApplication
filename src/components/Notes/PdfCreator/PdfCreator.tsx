import React, { FunctionComponent } from 'react';
import { Page, Text, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { MNote } from '../../../models/notes';

interface IProps {
    note: MNote;
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        color: '#2D3436',
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    date: {
        fontSize: 12,
        color: '#9BA9BB',
        textAlign: 'center',
        marginBottom: 5
    },
    type: {
        fontSize: 12,
        marginBottom: 30,
        textAlign: 'center'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
        maxWidth: 300
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#9BA9BB'
    },
});

const PdfCreator: FunctionComponent<IProps> = ({note}) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.date}>{note.date}</Text>
            <Text style={styles.type}>{`${note.type} / Priority : ${note.priority}`}</Text>
            <Text style={styles.text}>{note.text}</Text>
            {
                note.images.map((img, index) => {
                    return (
                        <Image key={index} src={img} style={styles.image} />
                    )
                })
            }
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);

export default PdfCreator;