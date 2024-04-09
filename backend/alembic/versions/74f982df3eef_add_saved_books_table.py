"""add_saved_books_table

Revision ID: 74f982df3eef
Revises: 7f0d2077a55c
Create Date: 2024-02-04 12:33:39.730512

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '74f982df3eef'
down_revision: Union[str, None] = '7f0d2077a55c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "saved_books",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id")),
        sa.Column("book_title", sa.String(100)),
        sa.Column("author", sa.JSON)
    )


def downgrade():
    op.drop_table("saved_books")
