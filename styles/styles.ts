// @/styles/styles.ts

import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from './theme';

interface Styles {
  // Common
  container: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;

  // Reusable input style
  input: TextStyle;

  // For list items
  listItem: ViewStyle;
  listItemText: TextStyle;
  profileImage: ImageStyle;

  // Pressable style for friend selection (e.g., createGroup screen)
  friendPressable: ViewStyle;

  // Chat
  chatContainer: ViewStyle;
  chatTitle: TextStyle;
  messageContainer: ViewStyle;
  messageSender: TextStyle;
  messageBubble: TextStyle;
  messageBubbleMe: TextStyle;
  chatInputWrapper: ViewStyle;
  chatTextInput: TextStyle;
  sendButton: ViewStyle;
  sendButtonText: TextStyle;

  // Link styles
  linkContainer: ViewStyle;
  linkText: TextStyle;

  // Groups
  groupContainer: ViewStyle;
  groupHeading: TextStyle;
  groupListItem: ViewStyle;
  groupListText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  // Common Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SPACING.md,
  },

  // Titles
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  subTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textDark,
    marginVertical: SPACING.xs,
  },

  // Reusable input style
  input: {
    backgroundColor: COLORS.textLight,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textDark,
    marginVertical: SPACING.xs,
    width: 250,
  },

  // List items
  listItem: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: COLORS.textLight,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Example shadow (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textDark,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },

  // Pressable style for friend selection (e.g., createGroup screen)
  friendPressable: {
    flexDirection: 'row',
    backgroundColor: COLORS.textLight,
    padding: SPACING.sm,
    marginVertical: SPACING.xs,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',

    // Optional shadow for pressables
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: 250,
  },

  // Chat containers
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    justifyContent: 'flex-start',
  },
  chatTitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textDark,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: SPACING.xs,
  },
  messageSender: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  messageBubble: {
    backgroundColor: COLORS.secondary,
    color: COLORS.textLight,
    padding: SPACING.sm,
    borderRadius: 16,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    marginBottom: SPACING.xs,
  },
  messageBubbleMe: {
    backgroundColor: COLORS.primary,
    color: COLORS.textLight,
    padding: SPACING.sm,
    borderRadius: 16,
    maxWidth: '75%',
    alignSelf: 'flex-end',
    marginBottom: SPACING.xs,
  },
  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  chatTextInput: {
    flex: 1,
    backgroundColor: COLORS.textLight,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textDark,
    marginRight: SPACING.sm,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },

  // Link Styles
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    margin: SPACING.md,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    textDecorationLine: 'underline',
    marginHorizontal: SPACING.sm,
  },

  // Groups
  groupContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SPACING.md,
  },
  groupHeading: {
    fontSize: FONT_SIZES.md,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    color: COLORS.textDark,
    textAlign: 'center',
  },
  groupListItem: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: COLORS.textLight,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Example shadow (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  groupListText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textDark,
    marginRight: SPACING.sm,
  },
});
