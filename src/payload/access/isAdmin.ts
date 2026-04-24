import type { Access } from 'payload'

/**
 * Returns true only when the authenticated user has the 'admin' role.
 * Use this for any write-access control that should be restricted to admins.
 */
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'
