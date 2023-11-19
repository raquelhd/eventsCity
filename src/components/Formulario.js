import React, {useEffect, useState} from 'react'
import {Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker";

const Formulario = ({
    modalVisible,
    cerrarModal,
    eventsCity,
    setEventsCity,
    eventCity: eventCityObj,
    setEventCity: setEventCityApp
}) => {

    const [id, setId] = useState('')
    const [eventName, setEventName] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [datePick, setDatePick] = useState(new Date())
    const [dateWithFormat, setDateWithFormat] = useState('')
    const [showDatePick, setShowDatePick] = useState(false)
    const [description, setDescription] = useState('')

    // Formatea la fecha como una cadena legible
    const changeDateWithFormat = () => {
        const startDate = datePick;
        setDateWithFormat(`${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`)
    }

    const toggleDatePick = () => {
        setShowDatePick(!showDatePick)
    }

    const onChangeDatePick = ({ type }, selectedDate) => {
        setDatePick(selectedDate)
        changeDateWithFormat()
        setShowDatePick(!showDatePick)
    }

    useEffect(() => {
        if(Object.keys(eventCityObj).length > 0 ) {
            setId(eventCityObj.id)
            setEventName(eventCityObj.eventName)
            setPropietario(eventCityObj.propietario)
            setEmail(eventCityObj.email)
            setTelefono(eventCityObj.telefono)
            setDatePick(eventCityObj.datePick)
            setDescription(eventCityObj.description)
        }
    }, [eventCityObj])

    const handleEventCity = () => {
        // Validar
        if([eventName, propietario, email, datePick, description].includes('') ) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios'
            )
            return
        }

        // Revisar si es un registro nuevo o edición
        const newEventCity = {
            eventName,
            propietario,
            email,
            telefono,
            datePick,
            description
        }


        if(id) {
            // Editando
            newEventCity.id = id

            const eventsCityActualizados = eventsCity.map(eventCityState => eventCityState.id === newEventCity.id ? newEventCity : eventCityState)
            setEventsCity(eventsCityActualizados)
            setEventCityApp({})

        } else {
            // Nuevo Registro
            newEventCity.id = Date.now()
            setEventsCity([...eventsCity, newEventCity])
        }
        cerrarModal()
        setId('')
        setEventName('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setDatePick(new Date())
        setDescription('')

    }



    return (
     <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <SafeAreaView style={styles.contenido}>
            <ScrollView>
                <Text
                    style={styles.titulo}
                >{eventCityObj.id ? 'Editar' : 'Nuevo'} {''}
                    <Text style={styles.tituloBold}>Evento</Text>
                </Text>

                <Pressable
                    style={styles.btnCancelar}
                    onLongPress={() => {
                        cerrarModal()
                        setEventCityApp({})
                        setId('')
                        setEventName('')
                        setPropietario('')
                        setEmail('')
                        setTelefono('')
                        setDatePick(new Date())
                        setDescription('')
                    }}
                >
                    <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                </Pressable>


                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre del evento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre del evento'
                        placeholderTextColor={'#666'}
                        value={eventName}
                        onChangeText={setEventName}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre del propietario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre del propietario'
                        placeholderTextColor={'#666'}
                        value={propietario}
                        onChangeText={setPropietario}
                    />
                </View>


                <View style={styles.campo}>
                    <Text style={styles.label}>Email del propietario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono Propietario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Teléfono Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='number-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={9}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha del evento</Text>
                    <Pressable onPress={ toggleDatePick }
                    >
                        <TextInput
                            style={styles.input}
                            placeholder= {dateWithFormat}
                            placeholderTextColor={'#666'}
                            value={dateWithFormat}
                            onChangeText={setDatePick}
                            editable={false}
                        />
                    </Pressable>

                    {showDatePick && <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={datePick}
                        locale='es'
                        onChange={ onChangeDatePick }
                    />}
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Descripcion</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholderTextColor={'#666'}
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable
                    style={styles.btnNewEvent}
                    onPress={handleEventCity}
                >
                    <Text style={styles.btnNewEventTexto}>{eventCityObj.id ? 'Editar' : 'Agregar'} Evento</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
      </Modal>
    )
}


const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#739072',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#ECE3CE',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#FFF',  
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    descriptionInput: {
        height: 100
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNewEvent: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNewEventTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    }
})

export default Formulario
