import {Colors, Fonts, Typography} from '../../styles';
export const bottomSheetStyle = {
  // common
  warmText: {
    ...Typography.errorText,
  },
  normalText: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 20,
    color: Colors.black,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 20,
  },
  bodyContainer: {
    marginTop: 15,
    padding: 10,
  },

  titleDialog: {
    ...Typography.titleDialog,
  },
  desc: {
    marginTop: 15,
    marginBottom: 30,
    ...Typography.descDialog,
  },
  btnContainer: {
    marginTop: 30,
  },
  btnLabel: {
    ...Typography.btnLabelDialog,
    paddingVertical: 15,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Typography.normalTextDialog,
  },
  selectText: {
    ...Typography.normalTextDialog,
  },
  selectPlaceholder: {
    ...Typography.normalTextDialog,
    color: Colors.secondary,
  },
  inputGroup: {
    gap: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  //   usernameDialog
  usernameInputGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  // hobby
  hobbyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  hobbyItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
  },
  labelHobby: {
    ...Typography.normalTextDialog,
  },
  hobbyIcon: {
    width: 19,
    height: 19,
  },
  inputContainer: {
    marginTop: 15,
  },
  // gender
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  genderItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  genderLabel: {
    ...Typography.genderLabel,
  },
  genderBtn: {
    padding: 15,
    borderRadius: 12,
  },
  // date of birth
  derivedFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  derivedField: {
    ...Typography.derivedField,
  },
  datePickerButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerBtnContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerText: {
    ...Typography.normalTextDialog,
  },
  // nationality
  dropdown: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  iconDrop: {
    width: 24,
    height: 24,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 20,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  iconFlag: {
    marginRight: 15,
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  // education
  educationLevel: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: Colors.background,
    padding: 18,
    ...Typography.normalTextDialog,
    marginBottom: 20,
  },
  // desc
  descInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
};
