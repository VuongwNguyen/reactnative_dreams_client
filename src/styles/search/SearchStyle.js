import {Colors, Scaling, Typography, Spacings} from '../../styles';
export const searchStyle = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: Spacings.lg,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.lg,
    minHeight: Spacings.xl,
  },

  searchContainer: {
    flex: 1,
    maxHeight: 50,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    borderRadius: Scaling.lg,
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 15,
  },
  rightIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  tagContainer: {
    marginVertical: 24,
    flexDirection: 'row',
    gap: 15,
  },
  tagSelected: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: Scaling.xs,
  },
  tagUnSelected: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: Scaling.xs,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  tagLabelSelected: {
    ...Typography.tagOptionSelected,
  },
  tagLabelUnSelected: {
    ...Typography.tagOptionUnSelected,
  },
  scrollContainer: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    gap: 20,
  },
};
